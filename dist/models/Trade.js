class Trade {

    constructor(
        id,
        typeOfTrade,
        setup,
        timeframe,
        additionalInfo,
        improvements
    ) {
        this.id = id;
        this.typeOfTrade = typeOfTrade; // real or papertrading
        this.setup = {
            setup,
            setupQuestion1 : additionalInfo.setupQuestion1,
            setupQuestion2 : additionalInfo.setupQuestion2,
            setupQuestion3 : additionalInfo.setupQuestion3 || '',
            timeframe : timeframe,
            entry : additionalInfo.entry,
            stop : additionalInfo.stop,
            takeprofit : additionalInfo.takeprofit,
        },
            this.technicals = {
            }
        this.improvements = {
            // betterEntries,
            // betterStops,
            // betterTakeprofits
        }
    }
    constructor();
}
export default Trade;