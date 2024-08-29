-- CreateTable
CREATE TABLE "current_expenses" (
    "userId" INTEGER NOT NULL,
    "weekExpense" DOUBLE PRECISION,
    "monthExpense" DOUBLE PRECISION,
    "yearExpense" DOUBLE PRECISION,

    CONSTRAINT "current_expenses_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "monthly_expense_analysis" (
    "userId" INTEGER NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "totalExpense" DOUBLE PRECISION,

    CONSTRAINT "monthly_expense_analysis_pkey" PRIMARY KEY ("userId","month")
);

-- AddForeignKey
ALTER TABLE "current_expenses" ADD CONSTRAINT "current_expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_expense_analysis" ADD CONSTRAINT "monthly_expense_analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
