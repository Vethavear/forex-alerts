let Journal = {
    render : async () => {
        let view =  /*html*/`
        <section id="container">
        <div id="stats" class="hide">
          <h1>Daily stats</h1>
          <div class="row">
            <label for="trades">Trades:</label>
            <p id="dailytrades">5</p>
          </div>
          <div class="row">
            <label for="R">Gains:</label>
            <p id="R">-5R</p>
          </div>
          <h1>Weekly stats</h1>
          <div class="row">
            <label for="trades">Trades:</label>
            <p id="weeklytrades">24</p>
          </div>
          <div class="row">
            <label for="R">Gains:</label>
            <p id="R">-24R</p>
          </div>
        </div>
        <div class="pairsTabs">
          <ul>
            <li class="checked">
              <button class="change">EUR/USD</button>
            </li>
            <li>
              <button class="change">EUR/GBP</button>
            </li>
            <li>
              <button class="change">GBP/USD</button>
            </li>
            <li>
              <button class="change">USD/JPY</button>
            </li>
            <li>
              <button class="change">AUD/USD</button>
            </li>
            <li>
              <button class="change">USD/CHF</button>
            </li>
            <li>
              <button class="change">USD/CAD</button>
            </li>
            <li>
              <button id="addpair">Add <i class="fas fa-plus-square"></i></button>
            </li>
          </ul>
        </div>
        <div id="addtrade">
    
          <div class="basic">
            <h1>Core</h1>
            <div class="row">
              <label for="pair">Pair</label>
              <input type="text" name="pair" id="pair" value="EURUSD">
            </div>
            <div class="row">
              <label for="date">Date</label>
              <input type="date" name="date" id="date">
            </div>
    
            <div class="row">
              <label for="result">Profit</label>
              <input type="text" name="result" id="result" placeholder="Fill this first">
            </div>
            <div class="row">
              <label for="chart">Chart</label>
              <input type="text" name="chart" id="chart">
            </div>
            <div class="row">
              <label for="thoughts">Thoughts</label>
              <textarea name="thoughts" id="thoughts" cols="25" rows="5"></textarea>
            </div>
    
          </div>
          <div class="flex">
    
            <div class="additionalInfo">
              <h1>Technicals</h1>
    
              <div id="setup" class="hide">
                <div class="cont">
                  <p>Setup</p>
    
                  <label>Continuation
                    <input type="radio" data-show="bases" data-hide="raids" name="setup" id="continuation" class="info"
                      value="continuation">
                  </label>
                  <label>Raid
                    <input type="radio" data-show="raids" data-hide="bases" name="setup" id="raid" class="info"
                      value="raid">
                  </label>
                  <p>Timeframe</p>
                  <div class="tf">
                    <label>5m
                      <input type="radio" name="timeframe" id="tf5" value="5m" class="info">
                    </label>
                    <label>15m
                      <input type="radio" name="timeframe" id="tf15" value="15m" class="info">
                    </label>
                    <label>30m
                      <input type="radio" name="timeframe" id="tf30" value="30m" class="info">
                    </label>
                    <label>1h
                      <input type="radio" name="timeframe" id="tf1H" value="1H" class="info">
                    </label>
                    <label>2h
                      <input type="radio" name="timeframe" id="tf2H" value="2h" class="info">
                    </label>
                    <label>4h
                      <input type="radio" name="timeframe" id="tf4H" value="4h" class="info">
                    </label>
                  </div>
                </div>
                <div class="setupInfo cont">
                  <div id="bases" class="hide">
                    <div class="cont">
                      <p>Base type</p>
                      <label>Blocky
                        <input type="radio" name="bases" class="info" id="blocky" value="blocky">
                      </label>
                      <label>Wicky
                        <input type="radio" name="bases" class="info" id="wicky" value="wicky">
                      </label>
                      <p>Visible on higher timeframes?</p>
                      <label>Yes
                        <input type="radio" name="visible" class="info" id="visibleYes" value="yes">
                      </label>
                      <label>No
                        <input type="radio" name="visible" class="info" id="visibleNo" value="no">
                      </label>
                      <p>Was there big base on the left?</p>
                      <label>Yes
                        <input type="radio" name="BigBaseLeft" class="info" id="BigBaseLeftYes" value="yes">
                      </label>
                      <label>No
                        <input type="radio" name="BigBaseLeft" class="info" id="BigBaseLeftNo" value="no">
                      </label>
                    </div>
                    <div id="continuationEntries" class="cont">
                      <p>Entry</p>
                      <label>Yes
                        <input type="radio" data-hide="ifWicksDiv" data-profit="positive" name="entry" class="info"
                          id="entryBasesYes" value="yes">
                      </label>
                      <label>Wicks
                        <input type="radio" data-show="ifWicksDiv" data-profit="positive" name="entry" class="info"
                          id="entryBasesWicks" value="gamble">
                      </label>
                      <label>Middle of base
                        <input type="radio" data-hide="ifWicksDiv" data-profit="positive" name="entry" class="info"
                          id="entryMiddle" value="ltf">
                      </label>
                    </div>
                    <div id="continuationStops" class="cont">
                      <p>Stoploss</p>
                      <label>Swing
                        <input type="radio" data-show="ifLTFDiv" data-hide="ifswingDiv" data-profit="positive" name="stop"
                          class="info" id="stopBasesYes" value="yes">
                      </label>
                      <label>Stop above minor high on LTF
                        <input type="radio" data-show="ifswingDiv" data-hide="ifLTFDiv" data-profit="negative" name="stop"
                          class="info" id="stopBasesLTF" value="ltf">
                      </label>
                      <label>Gambling stop
                        <input type="radio" data-show="ifswingDiv" data-profit="negative" name="stop" class="info"
                          id="stopBasesGamble" value="gamble">
                      </label>
                    </div>
                    <div id="continuationTps" class="cont">
                      <p>Takeprofit</p>
                      <label>First liq pool
                        <input type="radio" data-show="ifMajorPoolTpDiv" data-profit="positive" name="tp" class="info"
                          id="tpLiqPoolBases" value="yes">
                      </label>
                      <label>Major liq pool
                        <input type="radio" data-profit="positive" name="tp" class="info" id="tpMLiqPoolBases"
                          value="yes">
                      </label>
                      <label>First untested base
                        <input type="radio" data-show="ifFirstPoolTpDiv" data-profit="positive" name="tp" class="info"
                          id="tpBaseBases" value="yes">
                      </label>
                      <label>Opposite signal occured
                        <input type="radio" data-show="ifFirstPoolTpDiv" data-profit="positive" name="tp" class="info"
                          id="tpOppositeSignalBases" value="yes">
                      </label>
                    </div>
                  </div>
    
                  <div id="raids" class="hide">
                    <div class="cont">
                      <p>MSB type</p>
                      <label>Origin
                        <input type="radio" name="msb" class="info" id="origin" value="yes">
                      </label>
                      <label>Shady
                        <input type="radio" name="msb" class="info" id="shady" value="yes">
                      </label>
                      <p>Clear MSB on higher timeframe?</p>
                      <label>Yes
                        <input type="radio" name="clear" class="info" id="clearMSBYes" value="yes">
                      </label>
                      <label>No
                        <input type="radio" name="clear" class="info" id="clearMSBNo" value="no">
                      </label>
                    </div>
                    <div id="raidsEntries" class="cont">
                      <p>Entry</p>
                      <label>Middle between MSB and minor liq hunt
                        <input type="radio" name="entry" class="info" id="entryRaidsYes" value="yes">
                      </label>
                      <label>0.65
                        <input type="radio" name="entry" class="info" id="entryRaids65" value="yes">
                      </label>
                      <label>0.786
                        <input type="radio" name="entry" class="info" id="entryRaids786" value="yes">
                      </label>
                      <label>0.88
                        <input type="radio" name="entry" class="info" id="entry1Raids88" value="yes">
                      </label>
                    </div>
                    <div id="raidsStops" class="cont">
                      <p>Stoploss</p>
                      <label>Swing
                        <input type="radio" name="stop" class="info" id="stopRaidsYes" value="yes">
                      </label>
                      <label>Stop behind 1 (minor liq line)
                        <input type="radio" data-show="ifSwingStopRaidsDiv" data-hide="ifFibo078x088Div"
                          data-profit="negative" name="stop" class="info" id="stop1Raids" value="yes">
                      </label>
                      <label>0.78 stop
                        <input type="radio" data-show="ifFiboExtendedDiv" data-hide="ifFiboDiv" data-profit="negative"
                          name="stop" class="info" id="stop078Raids" value="yes">
                      </label>
                      <label>0.88 stop
                        <input type="radio" data-show="if01Stop" data-hide="ifFibo078x088Div" data-profit="negative"
                          name="stop" class="info" id="stop088Raids" value="yes">
                      </label>
                      <label>Gambling stop
                        <input type="radio" data-show="ifSwingStopRaidsDiv" data-hide="ifSwingStopRaidsDiv"
                          data-profit="negative" name="stop" class="info" id="stopRaidsGamble" value="yes">
                      </label>
                    </div>
                    <div id="raidsTps" class="cont">
                      <p>Takeprofit</p>
                      <label>First liq pool
                        <input type="radio" data-show="ifMajorPoolTpDiv" data-profit="positive"
                          name="tp" class="info" id="tpLiqPoolRaids" value="yes">
                      </label>
                      <label>Major liq pool
                        <input type="radio" data-profit="positive" name="tp"
                          class="info" id="tpMliqPoolRaids" value="ltf">
                      </label>
                      <label>First untested base
                        <input type="radio" data-show="ifFirstPoolTpDiv" data-profit="positive" name="tp" class="info"
                          id="tpBaseRaids" value="yes">
                      </label>
                      <label>Opposite signal occured
                        <input type="radio" data-show="ifFirstPoolTpDiv" data-profit="positive" name="tp" class="info"
                          id="tpOppositeSignalRaids" value="yes">
                      </label>
                      <label>-0.236
                        <input type="radio" data-show="ifn065TpDiv" data-profit="positive" name="tp" class="info"
                          id="tpn0236Raids" value="yes">
                      </label>
                      <label>-0.65
                        <input type="radio" data-show="ifn1TpDiv" data-profit="positive" name="tp" class="info "
                          id="tpn065Raids" value="yes">
                      </label>
                      <label>-1
                        <input type="radio" data-profit="positive" name="tp" class="info"
                          id="tpn01Raids" value="yes">
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            <div class="improvements">
              <h1>Improvements</h1>
              <!-- If stopped bases-->
              <div class="flex">
                <div id="ifswingDiv" class="hide">
                  <p id="ifSwingLabel">Did swing stop work out?</p>
                  <label>Yes
                    <input type="radio" data-show="missedR" data-profit="negative" name="ifSwing" class="info"
                      id="ifSwingYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="missedR" data-profit="negative" name="ifSwing" class="info"
                      id="ifSwingNo" value="no">
                  </label>
                  <!-- if yes -->
                  <div id="missedR" class="hide inputText">
                    <label>R missed (too tight stop)?</label>
                    <input type="text" name="missedR" class="info" id="missedR" value="0">
                  </div>
                </div>
                <!-- raids -->
                <!-- loses: -->
                <div id="ifFiboExtendedDiv" class="hide">
                  <p>Did 0.88 stop work out?</p>
                  <label>Yes
                    <input type="radio" data-show="missedR078Div" data-profit="negative" name="ifFiboExtended" class="info"
                      id="ifFiboExtendedYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-show="if01Stop" data-hide="missedR078Div" data-profit="negative"
                      name="ifFiboExtended" class="info" id="ifFiboExtendedNo" value="no">
                  </label>
                  <div id="missedR078Div" class="hide inputText">
                    <label>R missed (too tight stop)?</label>
                    <input type="text" name="missedR" class="info" id="missedR078" value="0">
                  </div>
                </div>
                <div id="if01Stop" class="hide">
                  <p>Did stop behind 1 (minor liq line) work out?</p>
                  <label>Yes
                    <input type="radio" data-show="missedR01Div" data-profit="negative" name="if01Stop" class="info"
                      id="if01StopYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-show="ifSwingStopRaidsDiv" data-hide="missedR01Div" data-profit="negative"
                      name="if01Stop" class="info" id="if01StopNo" value="no">
                  </label>
                  <div id="missedR01Div" class="hide inputText">
                    <label>R missed (too tight stop)?</label>
                    <input type="text" name="missedR" class="info" id="missedR01" value="0">
                  </div>
                </div>
                <div id="ifSwingStopRaidsDiv" class="hide">
                  <p>Did swing stop work out?</p>
                  <label>Yes
                    <input type="radio" data-show="missedRSwingDiv" data-profit="negative" name="ifSwingStopRaidsStop"
                      class="info" id="ifSwingStopRaidsStopYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="missedRSwingDiv" data-profit="negative" name="ifSwingStopRaidsStop"
                      class="info" id="ifSwingStopRaidsStopNo" value="no">
                  </label>
                  <div id="missedRSwingDiv" class="hide inputText">
                    <label>R missed (too tight stop)?</label>
                    <input type="text" name="missedR" class="info" id="missedRSwing" value="0">
                  </div>
                </div>
    
    
    
                <!-- If won bases -->
                <div id="ifWicksDiv" class="hide">
                  <p>Did entry at body work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedREntryCloseDiv" data-profit="positive" name="ifWicksClose"
                      class="info" id="ifWicksCloseYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="cuttedREntryCloseDiv" data-profit="positive" name="ifWicksClose"
                      class="info" id="ifWickClosesNo" value="no">
                  </label>
                  <div id="cuttedREntryCloseDiv" class="hide inputText">
                    <label>If used entry at body, profit:</label>
                    <input type="text" name="cuttedREntryClose" class="info" id="cuttedREntryClose" value="0">
                  </div>
                  <p>Did entry at middle of base work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedREntryMiddleDiv" data-profit="positive" name="ifWicksMiddle"
                      class="info" id="ifWicksMiddleYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="cuttedREntryMiddleDiv" data-profit="positive" name="ifWicksMiddle"
                      class="info" id="ifWicksMiddleNo" value="no">
                  </label>
                </div>
                <div id="cuttedREntryMiddleDiv" class="hide inputText">
                  <label>If used entry at middle, profit:</label>
                  <input type="text" name="cuttedREntryMiddle" class="info" id="cuttedREntryMiddle" value="0">
                </div>
                <div id="ifLTFDiv" class="hide">
                  <p>Did LTF stop work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedRStopDiv" data-profit="positive" name="ifLTF" class="info"
                      id="ifLTFYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="cuttedRStopDiv" data-profit="positive" name="ifLTF" class="info"
                      id="ifLTFNo" value="no">
                  </label>
                </div>
                <div id="cuttedRStopDiv" class="hide inputText">
                  <label>If used tighter stop, profit:</label>
                  <input type="text" name="cuttedRStop" class="info" id="cuttedRStop" value="0">
                </div>
                <!-- raids -->
                <!--  wins -->
                <div id="ifFiboDiv" class="hide">
                  <p>Did 0.65 with 0.786 stop work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedR065x0786" data-profit="positive" name="ifFibo" class="info"
                      id="ifFiboYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-show="ifFibo088Div" data-hide="cuttedR065x0786" data-profit="positive"
                      name="ifFibo" class="info" id="ifFiboNo" value="no">
                  </label>
                  <div id="cuttedR065x0786" class="hide inputText">
                    <label>0.65 with 0.786 would yield profit:</label>
                    <input type="text" name="cuttedR" class="info" id="cuttedR065x0786" value="0">
                  </div>
                </div>
                <div id="ifFibo088Div" class="hide">
                  <p>Did 0.65 with 0.88 stop work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedR065x088" data-profit="positive" name="ifFibo088" class="info"
                      id="ifFibo088Yes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-show="ifFibo088x1Div" data-hide="cuttedR065x088" data-profit="positive"
                      name="ifFibo088" class="info" id="ifFibo088No" value="no">
                  </label>
                  <div id="cuttedR065x088" class="hide inputText">
                    <label>0.65 with 0.88 would yield profit:</label>
                    <input type="text" name="cuttedR" class="info" id="cuttedR065x088" value="0">
                  </div>
                </div>
                <div id="ifFibo078x088Div" class="hide">
                  <p>Did 0.78 with 0.88 stop work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedR078x088" data-profit="positive" name="ifFibo078x088" class="info"
                      id="ifFibo078x088Yes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="cuttedR078x088" data-profit="positive" name="ifFibo078x088" class="info"
                      id="ifFibo078x088No" value="no">
                  </label>
                  <div id="cuttedR078x088" class="hide inputText">
                    <label>0.78 with 0.88 would yield profit:</label>
                    <input type="text" name="cuttedR" class="info" id="cuttedR078x088" value="0">
                  </div>
                </div>
                <div id="ifFibo088x1Div" class="hide">
                  <p>Did 0.88 with swing stop work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedR088x1" data-profit="positive" name="ifFibo088x1" class="info"
                      id="Fibo088x1Yes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="cuttedR088x1" data-profit="positive" name="ifFibo088x1" class="info"
                      id="Fibo088x1No" value="no">
                  </label>
                  <div id="cuttedR088x1" class="hide inputText">
                    <label>0.88 with swing would yield profit:</label>
                    <input type="text" name="cuttedR" class="info" id="cuttedR088x1" value="0">
                  </div>
                </div>
              </div>
              <div class="flex">
                <!-- if won bases and first liq pool-->
                <div id="ifMajorPoolTpDiv" class="hide">
                  <p>Did tp at major liq pool work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedifMajorPoolTp" data-profit="positive" name="ifMajorPoolTp"
                      class="info" id="ifMajorPoolTpYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="cuttedifMajorPoolTp" data-profit="positive" name="ifMajorPoolTp"
                      class="info" id="ifMajorPoolTpNo" value="no">
                  </label>
                  <div id="cuttedifMajorPoolTp" class="hide inputText">
                    <label>Tp at major liq pool would yield profit:</label>
                    <input type="text" name="cuttedRtp" class="info" id="cuttedifMajorPoolTp" value="0">
                  </div>
                </div>
                <div id="ifFirstPoolTpDiv" class="hide">
                  <p>Did tp at first liq pool work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedifFirstPoolTp" data-profit="positive" name="ifFirstPoolTp"
                      class="info" id="ifFirstPoolTpYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="cuttedifFirstPoolTp" data-profit="positive" name="ifFirstPoolTp"
                      class="info" id="ifFirstPoolTpNo" value="no">
                  </label>
                  <div id="cuttedifFirstPoolTp" class="hide inputText">
                    <label>Tp at first liq pool would yield profit:</label>
                    <input type="text" name="cuttedRtp" class="info" id="cuttedifFirstPoolTp" value="0">
                  </div>
                </div>
                <!-- wins raids fibo -->
                <div id="ifn0236TpDiv" class="hide">
                  <p>Did tp -0.23 work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedifn0236Tp" data-profit="positive" name="ifn0236Tp" class="info"
                      id="ifn0236TpYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="cuttedifn0236Tp" data-profit="positive" name="ifn0236Tp" class="info"
                      id="ifn0236TpNo" value="no">
                  </label>
                  <div id="cuttedifn0236Tp" class="hide inputText">
                    <label>Tp at -0.236 would yield profit:</label>
                    <input type="text" name="cuttedRtp" class="info" id="cuttedifn0236Tp" data-show="ifn1TpDiv" value="0">
                  </div>
                </div>
                <div id="ifn065TpDiv" class="hide">
                  <p>Did tp -0.65 work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedifn065Tp" data-profit="positive" name="ifn065Tp" class="info"
                      id="ifn065TpYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="cuttedifn065Tp" data-profit="positive" name="ifn065Tp" class="info"
                      id="ifn065TpNo" value="no">
                  </label>
                  <div id="cuttedifn065Tp" class="hide inputText">
                    <label>Tp at -0.65 would yield profit:</label>
                    <input type="text" name="cuttedRtp" class="info" id="cuttedifn065Tp" data-show="ifn1TpDiv" value="0">
                  </div>
                </div>
                <div id="ifn1TpDiv" class="hide">
                  <p>Did tp -1 work out?</p>
                  <label>Yes
                    <input type="radio" data-show="cuttedifn1Tp" data-profit="positive" name="ifn1Tp" class="info"
                      id="ifn1TpYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="cuttedifn1Tp" data-profit="positive" name="ifn1Tp" class="info"
                      id="ifn1TpNo" value="no">
                  </label>
                  <div id="cuttedifn1Tp" class="hide inputText">
                    <label>Tp at -1 would yield profit:</label>
                    <input type="text" name="cuttedRtp" class="info" id="cuttedifn1Tp" value="0">
                  </div>
                </div>
                <!-- if lost BY GREED -->
                <div id="greedDiv" class="hide">
                  <p>Was there any tp on which setup would work?</p>
                  <label>Yes
                    <input type="radio" data-show="missedRGreedDiv" data-profit="negative" name="wasGreed" class="info"
                      id="greedYes" value="yes">
                  </label>
                  <label>No
                    <input type="radio" data-hide="missedRGreedDiv" data-profit="negative" name="wasGreed" class="info"
                      id="greedNo" value="no">
                  </label>
                  <div id="missedRGreedDiv" class="hide">
                    <label>Opposite signal
                      <input type="radio"  data-profit="negative" name="greed" class="info"
                        id="greedOppositeSignal" value="yes">
                    </label>
                    <label>Untested base
                      <input type="radio"  data-profit="negative" name="greed" class="info"
                        id="greedUntestedBaseYes" value="yes">
                    </label>
                    <label>First liq pool
                      <input type="radio"  data-profit="negative" name="greed" class="info"
                        id="greedFirstLiqPoolYes" value="yes">
                    </label>
                    <label>-0.236
                      <input type="radio"  data-profit="negative" name="greed" class="info"
                        id="greedn0236No" value="no">
                    </label>
                    <label>-0.65
                      <input type="radio"  data-profit="negative" name="greed" class="info"
                        id="greedn065Yes" value="yes">
                    </label>
                    <label>-1
                      <input type="radio"  data-profit="negative" name="greed" class="info"
                        id="greedn1No" value="no">
                    </label>
     
                    <div id="missedRGreedInput" class="inputText">
                      <label>Missed gains by greed:</label>
                      <input type="text" name="missedRGreed" class="info" id="missedRGreed" value="0">
                    </div>
                  </div>
                </div>
    
              </div>
            </div>
          </div>
    
          <button id="addTradeBtn">Add</button>
        </div>
        <div id="settings" class="hide">
          <h1>Weekly settings</h1>
    
          <div class="row">
            <label for="acc">Account</label>
            <input type="text" name="acc" id="acc">
          </div>
          <div class="row">
            <label for="risk">% of Risk</label>
            <input type="text" name="risk" id="risk" value="1%">
          </div>
          <div class="row">
            <label for="size">Entry size</label>
            <input type="text" name="size" id="size" value="" disabled>
          </div>
          <div class="row">
            <label for="goal">Goal</label>
            <input type="text" name="goal" id="goal" value="5R">
          </div>
          <button id="changeSettings">Change</button>
        </div>
      </section>
        `
        return view
    },
    
    after_render: async () => {

        const UICtrl = (function () {
            const selectors = {
              pairContainer: document.querySelector("#pairpicker .pairsmenu"),
              alertsContainer: document.querySelector(".alerts .table .container"),
              inputField: document.getElementById("inputprice"),
              addBtn: document.getElementById("add"),
              currentPair: document.getElementById("currentpair"),
              firedAlertsContainer: document.querySelector(".alertsfired ul"),
              // Journal
              addtrade: document.getElementById('addtrade'),
              date: document.getElementById('date'),
              currentTradeR: document.getElementById('result'),
              dailytrades: document.getElementById('dailytrades'),
              weeklytrades: document.getElementById('weeklytrades'),
              gains: document.getElementById('R'),
              journalPairsContainer: document.querySelector('.pairsTabs ul'),
              journalCurrentPair: document.getElementById('pair'),
              // Adding trade radios etc
              journalRadios: document.querySelectorAll('.info'),
              setup: document.getElementById('setup'),
              greedDiv: document.getElementById('greedDiv'),
              fill: document.getElementById('fill'),
              continuation: document.getElementById('continuation'),
              raid: document.getElementById('raid'),
              basesContainer: document.getElementById('bases'),
              raidsContainer: document.getElementById('raids'),
              continuationStops: document.getElementById('continuationStops'),
              continuationEntries: document.getElementById('continuationEntries'),
              raidsStops: document.getElementById('raidsStops'),
              raidsEntries: document.getElementById('raidsEntries'),
              ifswingDiv: document.getElementById('ifswingDiv'),
              ifSwingYes: document.getElementById('ifSwingYes'),
              missedR: document.getElementById('missedR'),
              ifSwingNo: document.getElementById('ifSwingNo'),
              ifLTFDiv: document.getElementById('ifLTFDiv'),
              ifWicksDiv: document.getElementById('ifWicksDiv'),
              cuttedRStopDiv: document.getElementById('cuttedRStopDiv'),
              // cuttedREntryCloseDiv: document.getElementById('cuttedREntryCloseDiv'),
              // cuttedREntryMiddleDiv: document.getElementById('cuttedREntryMiddleDiv'),
              // stopBasesYes: document.getElementById('stopBasesYes'),
              //profit:
              // // ifWicksCloseYes: document.getElementById('ifWicksCloseYes'),
              // // ifWicksMiddleYes: document.getElementById('ifWicksMiddleYes'),
              // // ifWickClosesNo: document.getElementById('ifWickClosesNo'),
              // // ifWicksMiddleNo: document.getElementById('ifWicksMiddleNo'),
              // ifLTFStopWorked: document.getElementById('ifLTFYes'),
              // ifLTFStopDidntWork: document.getElementById('ifLTFNo'),
              // loses
              entryRaids65: document.getElementById('entryRaids65'),
              entryRaids786: document.getElementById('entryRaids786'),
              entryRaids88: document.getElementById('entryRaids88'),
              tpn0236Raids: document.getElementById('tpn0236Raids'),
              ifn065TpDiv: document.getElementById('ifn065TpDiv'),
              tpn065Raids: document.getElementById('tpn065Raids'),
              ifn1TpDiv: document.getElementById('ifn1TpDiv'),
              tpn01Raids: document.getElementById('tpn01Raids'),
              ifn0236TpDiv: document.getElementById('ifn0236TpDiv'),
              ifn0236TpYes: document.getElementById('ifn0236TpYes'),
              ifn065TpYes: document.getElementById('ifn065TpYes'),
              entryRaidsYes: document.getElementById('entryRaidsYes'),
              ifFiboExtendedDiv: document.getElementById('ifFiboExtendedDiv'),
              if01Stop: document.getElementById('if01Stop'),
              ifSwingStopRaidsDiv: document.getElementById('ifSwingStopRaidsDiv'),
              // // ifFiboExtendedYes: document.getElementById('ifFiboExtendedYes'),
              // missedR078Div: document.getElementById('missedR078Div'),
              // // ifFiboExtendedNo: document.getElementById('ifFiboExtendedNo'),
              // if01StopYes: document.getElementById('if01StopYes'),
              // if01StopNo: document.getElementById('if01StopNo'),
              missedR01Div: document.getElementById('missedR01Div'),
              ifSwingStopRaidsDiv: document.getElementById('ifSwingStopRaidsDiv'),
              // // ifSwingStopRaidsStopYes: document.getElementById('ifSwingStopRaidsStopYes'),
              // missedRSwingDiv: document.getElementById('missedRSwingDiv'),
              // ifSwingStopRaidsStopNo: document.getElementById('ifSwingStopRaidsStopNo'),
              // profit
              ifFiboDiv: document.getElementById('ifFiboDiv'),
              // ifFiboYes: document.getElementById('ifFiboYes'),
              // ifFiboNo: document.getElementById('ifFiboNo'),
              // // cuttedR065x0786: document.getElementById('cuttedR065x0786'),
              ifFibo088Div: document.getElementById('ifFibo088Div'),
              // ifFibo088Yes: document.getElementById('ifFibo088Yes'),
              // ifFibo088No: document.getElementById('ifFibo088No'),
              // // cuttedR065x088: document.getElementById('cuttedR065x088'),
              ifFibo078x088Div: document.getElementById('ifFibo078x088Div'),
              // ifFibo078x088Yes: document.getElementById('ifFibo078x088Yes'),
              // ifFibo078x088No: document.getElementById('ifFibo078x088No'),
              // cuttedR078x088: document.getElementById('cuttedR078x088'),
              ifFibo088x1Div: document.getElementById('ifFibo088x1Div'),
              // Fibo088x1Yes: document.getElementById('Fibo088x1Yes'),
              // Fibo088x1No: document.getElementById('Fibo088x1No'),
              // cuttedR088x1: document.getElementById('cuttedR088x1'),
              allInputs: document.getElementsByClassName('info')
            };
          
            return {
              getSelectors: function () {
                return selectors;
              },
        
              changeJournalPair: (pair, clickedTab) => {
                selectors.journalCurrentPair.value = pair.toUpperCase();
                const currentlyChecked = document.querySelector('.checked');
                currentlyChecked.classList.remove('checked');
                // add checked class to currently clicked class
                clickedTab.setAttribute('class', 'checked');
              },
              hideContainer: (container, hide) => {
                if (hide) {
                  container.classList.add('hide')
                } else {
                  container.classList.remove('hide');
                }
              },
              hide: (elementName, hide) => {
                const element = document.getElementById(elementName);
                if (hide) {
                  element.classList.add('hide')
                } else {
                  element.classList.remove('hide');
                }
              },
              initDate: () => {
                let today = new Date();
                selectors.date.valueAsDate = today;
              }
            };
          })();
          
          const AppCtrl = (function (UICtrl) {

            const selectors = UICtrl.getSelectors();
 
            return {
              init: async function () {
                UICtrl.initDate();

                // change Journal pair
                selectors.journalPairsContainer.addEventListener("click", (e) => {
                  const target = e.target;
                  console.log(target.parentElement.classList);
                  if (target.matches('.change')) {
                    const pair = target.innerHTML.replace("/", "");
                    UICtrl.changeJournalPair(pair, target.parentElement);
                  };
                });
          
                // expand additional info on certain conditions
                const currentTradeR = document.getElementById('result');
          
                currentTradeR.addEventListener('input', (e) => {
                  UICtrl.hideContainer(selectors.setup, false);
                })
          
                selectors.addtrade.addEventListener('click', element => {
          
                  if (element.target.type === 'radio') {
          
                    if (currentTradeR.value < 0) {
          
                      UICtrl.hideContainer(selectors.greedDiv, false);
          
                      if (element.target.dataset.profit === 'negative') {
          
                        if (element.target.dataset.show) {
                          UICtrl.hide(element.target.dataset.show, false);
                        }
                        if (element.target.dataset.hide) {
                          UICtrl.hide(element.target.dataset.hide, true);
                        }
          
                      } else if (element.target.dataset.profit === 'positive') {
                        UICtrl.hide(element.target.dataset.hide, true);
          
                      } else {
                        if (element.target.dataset.show) {
                          // if it has dataset
                          UICtrl.hide(element.target.dataset.show, false);
                        }
                        if (element.target.dataset.hide) {
                          // if it has dataset
                          UICtrl.hide(element.target.dataset.hide, true);
                        }
                      }
          
                      //CLEARING OTHER MARKS IF MISTAKE:
                      selectors.raidsStops.addEventListener('click', e => {
                        if (e.target.matches('#stopRaidsYes')) {
                          // if swing stop, hide all
                          UICtrl.hideContainer(selectors.if01Stop, true);
                          UICtrl.hideContainer(selectors.ifFiboExtendedDiv, true);
                          UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
                        }
                        else if (e.target.matches('#stop078Raids')) {
                          // if fibo entry
                          UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
                          UICtrl.hideContainer(selectors.if01Stop, true);
                        } else if (e.target.matches('#stop088Raids')) {
                          UICtrl.hideContainer(selectors.ifFiboExtendedDiv, true);
                          UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
                        } else if (e.target.matches('#stop1Raids')) {
                          UICtrl.hideContainer(selectors.if01Stop, true);
                          UICtrl.hideContainer(selectors.ifFiboExtendedDiv, true);
                          UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
                        } else if (e.target.matches('#stopRaidsGamble')) {
                          UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
                          UICtrl.hideContainer(selectors.if01Stop, true);
                        }
                      })
          
                    }
                    else {
          
                      if (element.target.dataset.profit === 'positive') {
          
                        if (element.target.dataset.show) {
                          UICtrl.hide(element.target.dataset.show, false);
                        }
                        if (element.target.dataset.hide) {
                          UICtrl.hide(element.target.dataset.hide, true);
                        }
          
                      } else if (element.target.dataset.profit === 'negative') {
                        UICtrl.hide(element.target.dataset.hide, true);
          
                      } else {
                        if (element.target.dataset.show) {
                          UICtrl.hide(element.target.dataset.show, false);
                        }
                        if (element.target.dataset.hide) {
                          UICtrl.hide(element.target.dataset.hide, true);
                        }
                      }
          
                      selectors.raidsStops.addEventListener('click', e => {
          
                        if (e.target.matches('#stopRaidsYes') && selectors.entryRaidsYes.checked) {
                          // swing stop and middle of msb entry
                          UICtrl.hideContainer(selectors.ifFiboDiv, false);
                          UICtrl.hideContainer(selectors.ifFibo088Div, true);
                          UICtrl.hideContainer(selectors.ifFibo078x088Div, true);
                          UICtrl.hideContainer(selectors.ifFibo088x1Div, true);
                        } else if (e.target.matches('#stopRaidsYes') && selectors.entryRaids786.checked) {
                          // swing stop and 0786 entry
                          UICtrl.hideContainer(selectors.ifFiboDiv, true);
                          UICtrl.hideContainer(selectors.ifFibo088Div, true);
                          UICtrl.hideContainer(selectors.ifFibo088x1Div, true);
                          UICtrl.hideContainer(selectors.ifFibo078x088Div, false);
                        } else if (e.target.matches('#stop078Raids') && selectors.entryRaids65.checked) {
                          // everything done well - hide all
                          UICtrl.hideContainer(selectors.ifFiboDiv, true);
                          UICtrl.hideContainer(selectors.ifFibo088Div, true);
                          UICtrl.hideContainer(selectors.ifFibo078x088Div, true);
                          UICtrl.hideContainer(selectors.ifFibo088x1Div, true);
                        } else if (e.target.matches('#stop088Raids') && selectors.entryRaids786.checked) {
                          //everything done well - hide all
                          UICtrl.hideContainer(selectors.ifFiboDiv, true);
                          UICtrl.hideContainer(selectors.ifFibo088Div, true);
                          UICtrl.hideContainer(selectors.ifFibo078x088Div, true);
                          UICtrl.hideContainer(selectors.ifFibo088x1Div, true);
                        }
                        else {
                          UICtrl.hideContainer(selectors.ifFiboDiv, false);
                          UICtrl.hideContainer(selectors.ifFibo088Div, true);
                          UICtrl.hideContainer(selectors.ifFibo078x088Div, true);
                          UICtrl.hideContainer(selectors.ifFibo088x1Div, true);
                        }
                      });
                      selectors.raidsEntries.addEventListener('click', e => {
          
                        if (e.target.matches('#entryRaids65') || e.target.matches('entryRaids786') || e.target.matches('entryRaids88')) {
                          // show take profits
                          if (selectors.tpn0236Raids.checked) {
                            UICtrl.hideContainer(selectors.ifn065TpDiv, false);
                          } else if (selectors.tpn065Raids.checked) {
                            UICtrl.hideContainer(selectors.ifn065TpDiv, true);
                            UICtrl.hideContainer(selectors.ifn1TpDiv, false);
                          } else if (selectors.tpn01Raids.checked) {
                            UICtrl.hideContainer(selectors.ifn065TpDiv, true);
                            UICtrl.hideContainer(selectors.ifn1TpDiv, true);
                          }
                        } else {
                          UICtrl.hideContainer(selectors.ifn0236TpDiv, false);
                        }
                      });
                      selectors.ifn0236TpYes.addEventListener('click', e => {
                        UICtrl.hideContainer(selectors.ifn065TpDiv, false);
                      })
                      selectors.ifn065TpYes.addEventListener('click', e => {
                        UICtrl.hideContainer(selectors.ifn1TpDiv, false);
                      })
                    }
                  }
                })
              }
            };
          })(UICtrl);
          
          AppCtrl.init();
          

    }        
}

export default Journal;