import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balanceBankAccount = 1000000;
    const bankAccount: BankAccount = getBankAccount(balanceBankAccount);

    expect(bankAccount.getBalance()).toBe(balanceBankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balanceBankAccount = 1000000;
    const amount = 2000000;
    const bankAccount: BankAccount = getBankAccount(balanceBankAccount);

    expect(() => {
      bankAccount.withdraw(amount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balanceBankAccount = 1000000;
    const balanceTargetBankAccount = 1000000;
    const amountForWithdraw = 2000000;
    const bankAccount: BankAccount = getBankAccount(balanceBankAccount);
    const targetBankAccount: BankAccount = getBankAccount(
      balanceTargetBankAccount,
    );

    expect(() => {
      bankAccount.transfer(amountForWithdraw, targetBankAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const balanceBankAccount = 1000000;
    const amountForTransfer = 2000000;
    const bankAccount: BankAccount = getBankAccount(balanceBankAccount);

    expect(() => {
      bankAccount.transfer(amountForTransfer, bankAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const balanceBankAccount = 1000000;
    const amountForDeposit = 500000;
    const bankAccount: BankAccount = getBankAccount(balanceBankAccount);
    bankAccount.deposit(amountForDeposit);

    expect(bankAccount.getBalance()).toBe(1500000);
  });

  test('should withdraw money', () => {
    const balanceBankAccount = 1000000;
    const amount = 1000000;
    const bankAccount: BankAccount = getBankAccount(balanceBankAccount);

    expect(bankAccount.withdraw(amount).getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const amountForTransfer = 500000;
    const balanceBankAccount = 1000000;
    const bankAccount: BankAccount = getBankAccount(balanceBankAccount);
    const balanceTargetBankAccount = 250000;
    const targetBankAccount: BankAccount = getBankAccount(
      balanceTargetBankAccount,
    );
    bankAccount.transfer(amountForTransfer, targetBankAccount);

    expect(targetBankAccount.getBalance()).toBe(750000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balanceBankAccount = 1000000;
    const bankAccount: BankAccount = getBankAccount(balanceBankAccount);
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValueOnce(balanceBankAccount);

    const fetchedBalance = await bankAccount.fetchBalance();

    expect(typeof fetchedBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balanceBankAccount = 1000000;
    const bankAccount: BankAccount = getBankAccount(balanceBankAccount);

    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValueOnce(balanceBankAccount);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(balanceBankAccount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balanceBankAccount = 1000000;
    const bankAccount: BankAccount = getBankAccount(balanceBankAccount);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    expect(bankAccount.synchronizeBalance.bind(bankAccount)).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
