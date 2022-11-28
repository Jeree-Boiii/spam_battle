// Global variables
aCount = 0;
upCount = 0;
ended = false;
started = false;
aClicking = false;
upClicking = false;
clickSFXa = document.getElementById('click1');
clickSFXup = document.getElementById('click2');
victory = document.getElementById('victory');

// Scrolls window to the top when loaded
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}

// If the start button is clicked
document.getElementById('start').addEventListener('click', function(e){
    // Button disappears
    e.preventDefault();
    this.style.animation = "fadeOut 1s linear";

    // Game items appear
    setTimeout(function(){
        document.getElementById('start').remove();

        document.getElementById('upKey').style.animation = "fadeIn 1s linear";
        document.getElementById('aKey').style.animation = "fadeIn 1s linear";

        document.getElementById('aKey').style.opacity = "1";
        document.getElementById('upKey').style.opacity = "1";

        document.getElementById('upKey').innerText = '3';
        document.getElementById('aKey').innerText = '3';

        //Countdown
        setTimeout(function(){
            document.getElementById('upKey').innerText = '2';
            document.getElementById('aKey').innerText = '2';
            setTimeout(function(){
                document.getElementById('upKey').innerText = '1';
                document.getElementById('aKey').innerText = '1';
                setTimeout(function(){
                    document.getElementById('upScore').style.opacity = "1";
                    document.getElementById('aScore').style.opacity = "1";
                    document.getElementById('upKey').innerText = '⬆️';
                    document.getElementById('aKey').innerText = '🅰️'

                    document.getElementById('upScoreNum').style.opacity = "1";
                    document.getElementById('aScoreNum').style.opacity = "1";
                    started = true;
                }, 1000)
            }, 1000);
        }, 1000);
    }, 1000)
    
})

// If key is pressed
document.addEventListener('keydown', function(e){
    // If 'A' is pressed
    if ((e.key === 'a' || e.key === 'A') && (!ended) && (started) && (!aClicking)){
        document.getElementById('aKey').style.backgroundColor = '#ff1900';
        clickSFXa.currentTime = 0;
        clickSFXa.play()
        aClicking = true;
        aCount ++;
    // If up arrow is pressed
    } else if ((e.key === 'ArrowUp')  && (!ended) && (started) && (!upClicking)){
        document.getElementById('upKey').style.backgroundColor = '#0000ff';
        clickSFXup.currentTime = 0;
        clickSFXup.play()
        upClicking = true;
        upCount ++;
    }

    // Changes display of scores
    if (started){
        document.getElementById('aFill').style.width = aCount+"%";
        document.getElementById('upFill').style.width = upCount+"%";
        document.getElementById('upScoreNum').innerText = upCount;
        document.getElementById('aScoreNum').innerText = aCount;
    }
    
    // Checks if 'A' has won
    if ((aCount === 100)){
        victory.play()
        gameEnd('A key');;
        ended = true;
    // Checks if 'Up arrow' has won
    } else if ((upCount === 100)){
        victory.play()
        gameEnd('Up arrow')
        ended = true;
    }
});

// What to do when the game ends
function gameEnd(winner){
    // if (!ended) makes sure it only runs once: ended is set to true right after
    if (!ended){
        // Game items disappear
        document.getElementById('upScore').style.animation = "fadeOut 1s linear";
        document.getElementById('aScore').style.animation = "fadeOut 1s linear";
        document.getElementById('upScoreNum').style.animation = "fadeOut 1s linear";
        document.getElementById('aScoreNum').style.animation = "fadeOut 1s linear";
        document.getElementById('upKey').style.animation = "fadeOut 1s linear";
        document.getElementById('aKey').style.animation = "fadeOut 1s linear";

        document.getElementById('upScore').style.opacity = "0";
        document.getElementById('aScore').style.opacity = "0";
        document.getElementById('upScoreNum').style.opacity = "0";
        document.getElementById('aScoreNum').style.opacity = "0";
        document.getElementById('aKey').style.opacity = "0";
        document.getElementById('upKey').style.opacity = "0";

        // Results appear: Prompt to refresh page appears
        setTimeout(function(){
            var text = document.createElement('h1');
            text.innerHTML = `${winner} wins <br> Up arrow: ${upCount} <br> A key: ${aCount} <br> Refresh (F5 / Ctrl + R) to play again <br> or click <a href='index.html'>here</a>`;
            text.style.opacity = '0';
            text.style.animation = "fadeIn 1s linear";
            document.getElementById("endScore").appendChild(text);
            text.style.opacity = '1';
        }, 1000)
    }    
}

// Checks if key has been released
document.addEventListener('keyup', function(e){
    // 'A' key has been released
    if (e.key === 'a' || e.key === 'A'){
        document.getElementById('aKey').style.backgroundColor = '#ffb429';
        aClicking = false;
    }
    // 'Up arrow' key has been released
    if (e.key === 'ArrowUp'){
        document.getElementById('upKey').style.backgroundColor = '#00c3ff';
        upClicking = false;
    }
})
