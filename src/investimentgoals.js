function convertToMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}
export function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthlyContribuition = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      "Investimento inicial e prazo devem ser preenchidos com valores positivos"
    );
  }
  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMonthlyReturnRate(1 + finalReturnRate / 100);

  const finalTimeHorizon =
    timeHorizon === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnArrays = [referenceInvestmentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnArrays[timeReference - 1].totalAmount * finalReturnRate +
      monthlyContribuition;
    const interestReturns =
      returnArrays[timeReference - 1].totalAmount * finalReturnRate;
    const investedAmount =
      startingAmount + monthlyContribuition * timeReference;
    const totalInterestReturns = totalAmount - investedAmount;
    returnArrays.push({
      investedAmount,
      interestReturns,
      totalInterestReturns,
      month: timeReference,
      totalAmount,
    });
  }
  return returnArrays;
}
