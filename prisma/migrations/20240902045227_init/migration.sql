-- DropForeignKey
ALTER TABLE "current_expenses" DROP CONSTRAINT "current_expenses_userId_fkey";

-- DropForeignKey
ALTER TABLE "monthly_expense_analysis" DROP CONSTRAINT "monthly_expense_analysis_userId_fkey";

-- AddForeignKey
ALTER TABLE "current_expenses" ADD CONSTRAINT "current_expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_expense_analysis" ADD CONSTRAINT "monthly_expense_analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
