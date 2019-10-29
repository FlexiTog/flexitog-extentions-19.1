{{!----
Description : Coundown clock
Author : Gordon Truslove
Date : 10/26/2019, 12:47:17 PM
----}}
{{#if showCountdown}}
<div class="ft-countdown">
<span class="ft-countdown-orderwithin">{{translate 'Order Within'}}:</span>
<span class="ft-countdown-time">{{hours}}<span class="ft-countdown-increment">{{translate 'hrs'}}</span> {{minutes}}<span class="ft-countdown-increment">{{translate 'mins'}}</span> {{seconds}}<span class="ft-countdown-increment">{{translate 'sec'}}</span></span><br />
<span class="ft-countdown-message">{{translate message}}</span>
</div>
{{/if}}