//グローバル変数
        
let eCode; //敵の識別番号
let eType;
let mType = 0;
let mTypeChangeHonoo = 0;
let mTypeChangeMizu = 0;
let mTypeChangeKoori = 0;
let mTypeChangeDenki = 0;
/*
タイプ一覧
無 = 0 
火 = 1 水にダメージ半減 氷にダメージ二倍
水 = 2 雷にダメージ半減 火にダメージ二倍
氷 = 3 火にダメージ半減 雷にダメージ二倍
雷 = 4 氷にダメージ半減 水にダメージ二倍
*/
let eHP;
let eMP;
let eHPmax;
let eMPmax;
let eLV;
let eSP; //敵の素早さ
let mHP;
let mMP;
let mHPmax;
let mMPmax;
let mLV;
let mSP; //自分の素早さ
let eGP; //GPは防御力
let mGP;
let damege;
let ownDmg;
let buff;
let critical;
let eURL;
let exp;
let mExp;
let expNext;
let thisIsItem;
let myItem1; //回復薬
let myItem2; //しあわせの種
let myItem3;
let myItem4;
let keepHeal = 0;
let keepHealOwnDmg;
let missMessage;
let criticalMessage;
let bigAttack = 0;
let myGuard = 0;
let cutDamege = 1;
let count = 4;
let soundCode;
let guardCount;
let mutekiCount;
let enemyNumber; //敵を識別する番号
let interval;
let loading = 1;

//ロード完了時の処理

window.onload = function(){
    loading = 0;
    document.getElementById("load").innerHTML = "画面をクリックしてプレイ"
}

//体験版ゲームを開始する関数

function gameTaiken(){
    if(loading == 0){
        mHP = 800;
        mMP = 80;
        mSP = 10;
        mHPmax = 700;
        mMPmax = 80;
        mLV = 1;
        myItem1 = 4;
        myItem2 = 2;
        myItem3 = 2;
        myItem4 = 2;
        mExp = 0;
        expNext = 1000;
        document.getElementById("audio8").pause();
        document.getElementById("audio8").currentTime = 0;
        document.getElementById("audio8").play();
        document.getElementById("start").style.display = "none";
        startBattele0();
    }
    else{}
}

//バトルを設定、開始する関数

function startBattele0(){//お試しバトル用関数
    eCode = 0;
    eType = 1;
    mTypeChangeHonoo = 0;
    mTypeChangeMizu = 0;
    mTypeChangeKoori = 0;
    mTypeChangeDenki = 0;
    mutekiCount = 0;
    eHP = 1000;
    eMP = 100;
    eSP = 3;
    eHPmax = 1000;
    eMPmax = 100;
    eLV = 3;
    enemyNumber = 0;
    commandLock = 0;
    exp = 5000;
    eURL = "url(image/バルミューダ.png)";
    document.getElementById("bg").style.display = "block";
    document.getElementById("ename").innerHTML = "ばるふぉん";
    document.getElementById("mname").innerHTML = "プレイヤー";
    document.getElementById("elevel").innerHTML = eLV;
    document.getElementById("mlevel").innerHTML = mLV;
    document.getElementById("ehp").innerHTML = eHP;
    document.getElementById("emp").innerHTML = eMP;
    document.getElementById("mhp").innerHTML = mHP;
    document.getElementById("mmp").innerHTML = mMP;
    document.getElementById("ehpmax").innerHTML = eHPmax;
    document.getElementById("empmax").innerHTML = eMPmax;
    document.getElementById("mhpmax").innerHTML = mHPmax;
    document.getElementById("mmpmax").innerHTML = mMPmax;
    document.getElementById("item1").innerHTML = myItem1;
    document.getElementById("item2").innerHTML = myItem2;
    document.getElementById("item3").innerHTML = myItem3;
    document.getElementById("item4").innerHTML = myItem4;
    bgcolorRainbowAnimate();
    setTimeout(batteleStartAnimation, 5000);
}
function batteleStartAnimation(){
    document.getElementById("bg").classList.add("bg");
    document.getElementById("audio22").pause();
    document.getElementById("audio22").currentTime = 0;
    document.getElementById("audio22").play();
    count = 10;
    interval = setInterval(function(){
        count = count - 1;
        if(count < 0){
            clearInterval(interval);
            if(eCode == 0){
                setTimeout(bossBattele0, 1000);
            }
            else{}
        }else{
            document.getElementById("bg").style.backgroundImage = "url()";
        }
        setTimeout(function(){
            document.getElementById("bg").style.backgroundImage = eURL;
        }, 100);
    }, 200);
}
function bossBattele0(){
    document.getElementById("audio20").pause();
    document.getElementById("audio20").currentTime = 0;
    document.getElementById("audio20").play();
    document.getElementById("bg").style.backgroundImage = eURL;
    document.getElementById("bg").style.backgroundSize = "";
    document.getElementById("message").innerHTML = "ばるふぉんがあらわれた。";
    document.getElementById("message").style.display = "block";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        setTimeout(function(){
            if(mSP >= eSP){
                document.getElementById("enemy").style.display = "block";
                document.getElementById("audio0").volume = 0.5;
                document.getElementById("audio0").play();
                myTurn();
            }
            else{
                document.getElementById("enemy").style.display = "block";
                document.getElementById("audio0").volume = 0.5;
                document.getElementById("audio0").play();
                bossTurn();
            }
        }, 750);
    }, 2500);
}

//自分のターンで動く関数

function myTurn(){//使用可能になったら効果音
    thisIsItem = 0;
    document.getElementById("bg").classList.add("bg");
    document.getElementById("audio18").pause();
    document.getElementById("audio18").currentTime = 0;
    document.getElementById("audio18").play();
    document.getElementById("yazirushi1").innerHTML = "＞ ";
    document.getElementById("yazirushi2").innerHTML = " ＜";
    eMP = eMP + 5;
    if(eMP > eMPmax){
        eMP = eMPmax;
    }
    if(mutekiCount != 0){
        mutekiCount = mutekiCount - 1;
    }
    if(keepHeal != 0){
        document.getElementById("audio2").pause();
        document.getElementById("audio2").currentTime = 0;
        document.getElementById("audio2").play();
        keepHeal = keepHeal - 1;
        mHP = mHP + keepHealOwnDmg;
        document.getElementById("damege").innerHTML = keepHealOwnDmg;
        document.getElementById("damege").style.color = "#00ffae";
        document.getElementById("damege").style.display = "block";
        setTimeout(function(){
            document.getElementById("damege").style.display = "none";
        }, 990);
    }
    mMP = mMP + 5;
    if(mMP > mMPmax){
        mMP = mMPmax;
    }
    if(mHP > mHPmax){
        mHP = mHPmax;
    }
    if(mTypeChangeHonoo != 0){
        mTypeChangeHonoo = mTypeChangeHonoo - 1;
        if(mTypeChangeHonoo == 0){
            mType = 0;
        }
    }
    if(mTypeChangeMizu != 0){
        mTypeChangeMizu = mTypeChangeMizu - 1;
        if(mTypeChangeMizu == 0){
            mType = 0;
        }
    }
    if(mTypeChangeKoori != 0){
        mTypeChangeKoori = mTypeChangeKoori - 1;
        if(mTypeChangeKoori == 0){
            mType = 0;
        }
    }
    if(mTypeChangeDenki != 0){
        mTypeChangeDenki = mTypeChangeDenki - 1;
        if(mTypeChangeDenki == 0){
            mType = 0;
        }
    }
    count = 4;
    cutDamege = 1;
    commandLock = 0;
    myGuard = 0;
    document.getElementById("emp").innerHTML = eMP;
    document.getElementById("mmp").innerHTML = mMP;
    document.getElementById("mhp").innerHTML = mHP;
    document.getElementById("me").style.display = "block";
    document.getElementById("guardphaseText").innerHTML = "GUARD SYSTEM<br><font class='hyper'>Activated</font>";
    document.getElementById("guardphaseText").style.color = "#fff";
}

//コマンドを実行する関数（こうげき）

function attack1(){
    document.getElementById("audio6").pause();
    document.getElementById("audio6").currentTime = 0;
    document.getElementById("audio6").play();
    commandLock = 1;
    ownDmg = 40;
    missMessage = "外してしまった。"
    criticalMessage = "急所にあたった。";
    document.getElementById("message").innerHTML = "投げナイフをつかった。";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandA").style.display = "none";
    setTimeout(myAttack, 1000);
    //急所に当たるか普通か外すか
    critical = Math.floor(Math.random() * 100);
    if(critical <= -1){
        critical = 0;
    }
    else{
        if(critical <= 94){
            critical = 1;
        }
        else{
            if(critical >= 95){
                critical = 2;
            }
        }
    }
}
function attack2(){
    document.getElementById("audio4").pause();
    document.getElementById("audio4").currentTime = 0;
    document.getElementById("audio4").play();
    commandLock = 1;
    ownDmg = 120;
    missMessage = "しかし当たらなかった。";
    criticalMessage = "急所にあたった。";
    document.getElementById("message").innerHTML = "こんしんのたて斬りだ！";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandA").style.display = "none";
    setTimeout(myAttack, 1000);
    //急所に当たるか普通か外すか
    critical = Math.floor(Math.random() * 100);
    if(critical <= 29){
        critical = 0;
    }
    else{
        if(critical <= 59){
            critical = 1;
        }
        else{
            if(critical >= 60){
                critical = 2;
            }
        }
    }
}

//コマンドを実行する関数（まほう）

function magic1(){
    mMP = mMP - 19;
    if(mMP < 0){//MP不足を判定
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
        mMP = mMP + 19;
    }else{
        document.getElementById("audio11").pause();
        document.getElementById("audio11").currentTime = 0;
        document.getElementById("audio11").play();
        commandLock = 1;
        ownDmg = 70;
        missMessage = "効果はいまひとつのようだ。";
        criticalMessage = "効果はばつぐんだ。";
        document.getElementById("message").innerHTML = "火あぶりにしてやる！";
        document.getElementById("message").style.display = "block";
        document.getElementById("commandM").style.display = "none";
        document.getElementById("mmp").innerHTML = mMP;
        setTimeout(myAttack, 1000);
        //属性相性判定
        if(eType == 2){
            critical = 0.5;
        }
        else{
            if(eType == 3){
                critical = 2;
            }
            else{
                critical = 1;
            }
        }
    }
}
function magic2(){
    mMP = mMP - 23;
    if(mMP < 0){//MP不足を判定
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
        mMP = mMP + 23;
    }else{
        document.getElementById("audio9").pause();
        document.getElementById("audio9").currentTime = 0;
        document.getElementById("audio9").play();
        commandLock = 1;
        ownDmg = 80;
        missMessage = "効果はいまひとつのようだ。";
        criticalMessage = "効果はばつぐんだ。";
        document.getElementById("message").innerHTML = "バケツをひっくり返した。";
        document.getElementById("message").style.display = "block";
        document.getElementById("commandM").style.display = "none";
        document.getElementById("mmp").innerHTML = mMP;
        setTimeout(myAttack, 1000);
        //属性相性判定
        if(eType == 4){
            critical = 0.5;
        }
        else{
            if(eType == 1){
                critical = 2;
            }
            else{
                critical = 1;
            }
        }
    }
}
function magic3(){
    mMP = mMP - 10;
    if(mMP < 0){//MP不足を判定
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
        mMP = mMP + 10;
    }else{
        document.getElementById("audio10").pause();
        document.getElementById("audio10").currentTime = 0;
        document.getElementById("audio10").play();
        commandLock = 1;
        ownDmg = 40;
        missMessage = "効果はいまひとつのようだ。";
        criticalMessage = "効果はばつぐんだ。";
        document.getElementById("message").innerHTML = "全力投球だッッ！";
        document.getElementById("message").style.display = "block";
        document.getElementById("commandM").style.display = "none";
        document.getElementById("mmp").innerHTML = mMP;
        setTimeout(myAttack, 1000);
        //属性相性判定
        if(eType == 1){
            critical = 0.5;
        }
        else{
            if(eType == 4){
                critical = 2;
            }
            else{
                critical = 1;
            }
        }
    }
}
function magic4(){
    mMP = mMP - 48;
    if(mMP < 0){//MP不足を判定
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
        mMP = mMP + 48;
    }else{
        document.getElementById("audio12").pause();
        document.getElementById("audio12").currentTime = 0;
        document.getElementById("audio12").play();
        commandLock = 1;
        ownDmg = 185;
        missMessage = "効果はいまひとつのようだ。";
        criticalMessage = "効果はばつぐんだ。";
        document.getElementById("message").innerHTML = "エネルギー充填完了！ 発射！！";
        document.getElementById("message").style.display = "block";
        document.getElementById("commandM").style.display = "none";
        document.getElementById("mmp").innerHTML = mMP;
        setTimeout(myAttack, 1000);
        //属性相性判定
        if(eType == 3){
            critical = 0.5;
        }
        else{
            if(eType == 2){
                critical = 2;
            }
            else{
                critical = 1;
            }
        }
    }
}
function magic5(){
    mMP = mMP - 70;
    if((mMP < 0) || (mutekiCount != 0)){//MP不足と効果が切れているかを判定
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
        mMP = mMP + 70;
    }
    else{
        document.getElementById("audio15").pause();
        document.getElementById("audio15").currentTime = 0;
        document.getElementById("audio15").play();
        commandLock = 1;
        mutekiCount = 2;
        document.getElementById("message").innerHTML = "2ターンの間むてきになった。";
        document.getElementById("message").style.display = "block";
        document.getElementById("commandM").style.display = "none";
        document.getElementById("mmp").innerHTML = mMP;
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            setTimeout(bossTurn, 2000);
        }, 1000);
    }
}
function magic6(){
    mMP = mMP - 24;
    if(mMP < 0){//MP不足を判定
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
        mMP = mMP + 24;
    }
    else{
        thisIsItem = 0;
        document.getElementById("audio15").pause();
        document.getElementById("audio15").currentTime = 0;
        document.getElementById("audio15").play();
        commandLock = 1;
        ownDmg = 50;
        document.getElementById("item1").innerHTML = myItem1;
        criticalMessage = "超回復した。";
        document.getElementById("message").innerHTML = "ヒアルをとなえた。";
        document.getElementById("message").style.display = "block";
        document.getElementById("commandM").style.display = "none";
        setTimeout(myHeal, 1000);
        //回復量ルーレット
        critical = Math.floor(Math.random() * 100);
        if(critical <= 24){
            critical = 2;
        }
        else{
            critical = 1;
        }
    }
}

//コマンドを実行する関数（アイテム）

function item1(){
    myItem1 = myItem1 - 1;
    if(myItem1 < 0){//アイテム不足を判定
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
        myItem1 = myItem1 + 1;
    }else{
        thisIsItem = 1;
        document.getElementById("audio19").pause();
        document.getElementById("audio19").currentTime = 0;
        document.getElementById("audio19").play();
        commandLock = 1;
        ownDmg = 150;
        document.getElementById("item1").innerHTML = myItem1;
        criticalMessage = "超回復した。";
        document.getElementById("message").innerHTML = "回復薬をつかった。";
        document.getElementById("message").style.display = "block";
        document.getElementById("commandI").style.display = "none";
        setTimeout(myHeal, 1000);
        //回復量ルーレット
        critical = Math.floor(Math.random() * 100);
        if(critical <= 24){
            critical = 2;
        }
        else{
            critical = 1;
        }
    }
}
function item2(){
    myItem2 = myItem2 - 1;
    if((myItem2 < 0) || (keepHeal != 0)){//アイテム不足と効果が切れているかを判定
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
        myItem2 = myItem2 + 1;
    }else{
        document.getElementById("audio19").pause();
        document.getElementById("audio19").currentTime = 0;
        document.getElementById("audio19").play();
        commandLock = 1;
        keepHeal = 5;
        keepHealOwnDmg = 50;
        document.getElementById("item2").innerHTML = myItem2;
        document.getElementById("message").innerHTML = "5ターンの間HPが50ずつ回復する。";
        document.getElementById("message").style.display = "block";
        document.getElementById("commandI").style.display = "none";
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            setTimeout(bossTurn, 2000);
        }, 1000);
    }
}
function item3(){
    myItem3 = myItem3 - 1;
    if((myItem3 < 0) || (mTypeChangeMizu != 0)){//アイテム不足と効果が切れているかを判定
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
        myItem3 = myItem3 + 1;
    }else{
        document.getElementById("audio19").pause();
        document.getElementById("audio19").currentTime = 0;
        document.getElementById("audio19").play();
        mTypeChangeHonoo = 0;
        mTypeChangeKoori = 0;
        mTypeChangeDenki = 0;
        commandLock = 1;
        mTypeChangeMizu = 4;
        mType = 2;
        document.getElementById("item3").innerHTML = myItem3;
        document.getElementById("message").innerHTML = "4ターンの間みずタイプになる。";
        document.getElementById("message").style.display = "block";
        document.getElementById("commandI").style.display = "none";
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            setTimeout(bossTurn, 2000);
        }, 1000);
    }
}
function item4(){
    myItem4 = myItem4 - 1;
    if((myItem4 < 0) || (mTypeChangeKoori != 0)){//アイテム不足と効果が切れているかを判定
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
        myItem4 = myItem4 + 1;
    }else{
        mTypeChangeHonoo = 0;
        mTypeChangeMizu = 0;
        mTypeChangeDenki = 0;
        document.getElementById("audio19").pause();
        document.getElementById("audio19").currentTime = 0;
        document.getElementById("audio19").play();
        commandLock = 1;
        mTypeChangeKoori = 4;
        mType = 3;
        document.getElementById("item4").innerHTML = myItem4;
        document.getElementById("message").innerHTML = "4ターンの間こおりタイプになる。";
        document.getElementById("message").style.display = "block";
        document.getElementById("commandI").style.display = "none";
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            setTimeout(bossTurn, 2000);
        }, 1000);
    }
}

//コマンドを実行する関数（ガード）

function guard1(){
    document.getElementById("audio14").pause();
    document.getElementById("audio14").currentTime = 0;
    document.getElementById("audio14").play();
    myGuard = 1;
    commandLock = 1;
    document.getElementById("message").innerHTML = "ぼうぎょをかためた。";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandG").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        setTimeout(bossTurn, 1500);
    }, 1500);
}

//自分の攻撃を実行する関数

function myAttack(){
    buff = 0.1 * mLV + 1;
    eGP = eLV / 10 + 1;
    damege = ownDmg * buff * critical;
    damege = damege / eGP;
    let a = parseInt(damege, 10);
    damege = a;
    eHP = eHP - damege;
    if(critical == 0){
        document.getElementById("audio21").pause();
        document.getElementById("audio21").currentTime = 0;
        document.getElementById("audio21").play();
        document.getElementById("message").innerHTML = missMessage;
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            setTimeout(bossTurn, 2000);
        }, 1000)
    }
    else if(critical == 0.5){
        document.getElementById("audio21").pause();
        document.getElementById("audio21").currentTime = 0;
        document.getElementById("audio21").play();
        document.getElementById("message").innerHTML = missMessage;
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            interval = setInterval(damegeAnimation, 200);
        }, 1000)
    }
    else if(critical == 2){
        document.getElementById("audio20").pause();
        document.getElementById("audio20").currentTime = 0;
        document.getElementById("audio20").play();
        document.getElementById("message").innerHTML = criticalMessage;
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            interval = setInterval(damegeAnimation, 200);
        }, 1000)
    }
    else{
        document.getElementById("message").style.display = "none";
        interval = setInterval(damegeAnimation, 200);
    }
}
function damegeAnimation(){
    count = count - 1;
    if(count == 0){
        if(eHP <= 0){
            document.getElementById("audio23").pause();
            document.getElementById("audio23").currentTime = 0;
            document.getElementById("audio23").play();
            document.getElementById("damege").innerHTML = damege;
            document.getElementById("damege").style.color = "#f00";
            document.getElementById("damege").style.display = "block";
            setTimeout(function(){
                document.getElementById("damege").style.display = "none";
            }, 990);
            document.getElementById("ehp").innerHTML = 0;
        }
        else{
            document.getElementById("audio1").pause();
            document.getElementById("audio1").currentTime = 0;
            document.getElementById("audio1").play();
            document.getElementById("damege").innerHTML = damege;
            document.getElementById("damege").style.color = "#f00";
            document.getElementById("damege").style.display = "block";
            setTimeout(function(){
                document.getElementById("damege").style.display = "none";
            }, 990);
            document.getElementById("ehp").innerHTML = eHP;
        }
    }
    if(count < 0){
        clearInterval(interval);
        if(eHP <= 0){
            setTimeout(function(){
                document.getElementById("bg").style.backgroundImage = "url()";
            }, 1000);
            setTimeout(bossDie, 2000);
        }
        else{
            if(enemyNumber == 0){
                setInterval(function(){
                }, 500)
                setTimeout(bossTurn, 2000);
            }
            else{}
        }
    }
    document.getElementById("enemy").style.display = "none";
    document.getElementById("bg").style.backgroundImage = "url()";
    setTimeout(function(){
        document.getElementById("enemy").style.display = "block";
        document.getElementById("bg").style.backgroundImage = eURL;
    }, 100);
}

//自分の回復を実行する関数

function myHeal(){
    if(thisIsItem == 1){
        damege = ownDmg * critical;
        mHP = mHP + damege;
        if(mHP > mHPmax){
            mHP = mHPmax;
        }
        if(critical == 2){
            soundCode = 1;
            document.getElementById("audio20").pause();
            document.getElementById("audio20").currentTime = 0;
            document.getElementById("audio20").play();
            document.getElementById("message").innerHTML = criticalMessage;
            setTimeout(function(){
                document.getElementById("message").style.display = "none";
                interval = setInterval(healAnimation, 200);
            }, 1000);
        }
        else{
            soundCode = 2;
            document.getElementById("message").style.display = "none";
            interval = setInterval(healAnimation, 200);
        }
    }
    else{
        buff = 0.1 * mLV + 1;
        damege = ownDmg * buff * critical;
        let a = parseInt(damege, 10);
        damege = a;
        mHP = mHP + damege;
        if(mHP > mHPmax){
            mHP = mHPmax;
        }
        if(critical == 2){
            soundCode = 1;
            document.getElementById("audio20").pause();
            document.getElementById("audio20").currentTime = 0;
            document.getElementById("audio20").play();
            document.getElementById("message").innerHTML = criticalMessage;
            setTimeout(function(){
                document.getElementById("message").style.display = "none";
                interval = setInterval(healAnimation, 200);
            }, 1000);
        }
        else{
            soundCode = 2;
            document.getElementById("message").style.display = "none";
            interval = setInterval(healAnimation, 200);
        }
    }
}
function healAnimation(){
    count = count - 1;
    if(count == 0){
        document.getElementById("damege").innerHTML = damege;
        document.getElementById("damege").style.color = "#00ffae";
        document.getElementById("damege").style.display = "block";
        setTimeout(function(){
            document.getElementById("damege").style.display = "none";
        }, 990);
        document.getElementById("mhp").innerHTML = mHP;
        if(soundCode == 2){
            document.getElementById("audio2").pause();
            document.getElementById("audio2").currentTime = 0;
            document.getElementById("audio2").play();
        }
        else{
            document.getElementById("audio3").pause();
            document.getElementById("audio3").currentTime = 0;
            document.getElementById("audio3").play();
        }
    }
    if(count < 0){
        clearInterval(interval);
        if(enemyNumber == 0){
                setTimeout(bossTurn, 2000);
        }
        else{}
        setTimeout(function(){
            document.getElementById("me").style.display = "none";
        }, 1500);
    }
    document.getElementById("me").style.display = "none";
    setTimeout(function(){
        document.getElementById("me").style.display = "block";
    }, 100);
}

//敵のターンで動く関数

function bossTurn(){
    document.getElementById("yazirushi1").innerHTML = "";
    document.getElementById("yazirushi2").innerHTML = "";
    if(eCode == 0){
        bossTurn0();
    }
    else{}
}
function bossTurn0(){
    count = 4;
    let oowaza = Math.floor(Math.random() * 3);
    if((oowaza == 0) && (eHP < 400) && (bigAttack == 0)){
        bigAttack = 2;
    }
    if(bigAttack != 0){
        bigAttack = bigAttack - 1;
        if(bigAttack == 1){
            document.getElementById("audio7").pause();
            document.getElementById("audio7").currentTime = 0;
            document.getElementById("audio7").play();
            document.getElementById("message").innerHTML = "てきがまずいオーラを放っている。";
            document.getElementById("message").style.display = "block";
            setTimeout(function(){
                document.getElementById("message").style.display = "none";
                setTimeout(myTurn, 3000);
            }, 1500);
        }
        else if(bigAttack == 0){
            document.getElementById("audio22").pause();
            document.getElementById("audio22").currentTime = 0;
            document.getElementById("audio22").play();
            ownDmg = 600;
            missMessage = "効果はいまひとつのようだ。";
            criticalMessage = "効果はばつぐんだ。";
            document.getElementById("message").innerHTML = "てきのスーパー・ノヴァ。";
            document.getElementById("message").style.display = "block";
            setTimeout(enemyAttack, 1000);
            //属性相性判定
            if(mType == 2){
                critical = 0.5;
            }
            else{
                if(mType == 3){
                    critical = 2;
                }
                else{
                    critical = 1;
                }
            }
        }
    }
    else{
        let eAtk = Math.round(Math.random() * 100);
        if((eAtk >= 0) && (eAtk <= 19)){
            if(eMP < 75){//MP不足を判定
                bossTurn0();
            }else{
                document.getElementById("audio11").pause();
                document.getElementById("audio11").currentTime = 0;
                document.getElementById("audio11").play();
                ownDmg = 230;
                eMP = eMP - 75;
                missMessage = "効果はいまひとつのようだ。";
                criticalMessage = "効果はばつぐんだ。";
                document.getElementById("message").innerHTML = "てきのヘルフレイム。";
                document.getElementById("message").style.display = "block";
                document.getElementById("emp").innerHTML = eMP;
                setTimeout(enemyAttack, 1000);
                //属性相性判定
                if(mType == 2){
                    critical = 0.5;
                }
                else{
                    if(mType == 3){
                        critical = 2;
                    }
                    else{
                        critical = 1;
                    }
                }
            }
        }
        else if((eAtk >= 20) && (eAtk <= 39)){
            if(eMP < 52){//MP不足を判定
                bossTurn0();
            }else{
                document.getElementById("audio11").pause();
                document.getElementById("audio11").currentTime = 0;
                document.getElementById("audio11").play();
                ownDmg = 150;
                eMP = eMP - 52;
                missMessage = "効果はいまひとつのようだ。";
                criticalMessage = "効果はばつぐんだ。";
                document.getElementById("message").innerHTML = "てきのかえん。";
                document.getElementById("message").style.display = "block";
                document.getElementById("emp").innerHTML = eMP;
                setTimeout(enemyAttack, 1000);
                //属性相性判定
                if(mType == 2){
                    critical = 0.5;
                }
                else{
                    if(mType == 3){
                        critical = 2;
                    }
                    else{
                        critical = 1;
                    }
                }
            }
        }
        else if((eAtk >= 40) && (eAtk <= 59)){
            document.getElementById("audio8").pause();
            document.getElementById("audio8").currentTime = 0;
            document.getElementById("audio8").play();
            ownDmg = 130;
            missMessage = "外したようだ。";
            criticalMessage = "急所にあたった。";
            document.getElementById("message").innerHTML = "てきの一閃斬。";
            document.getElementById("message").style.display = "block";
            document.getElementById("emp").innerHTML = eMP;
            setTimeout(enemyAttack, 1000);
            //急所に当たるか普通か外すか
            critical = Math.floor(Math.random() * 100);
            if(critical <= 19){
                critical = 0;
            }
            else{
                if(critical <= 94){
                    critical = 1;
                }
                else{
                    if(critical >= 95){
                        critical = 2;
                    }
                }
            }
        }
        else if((eAtk >= 60) && (eAtk <= 79)){
            document.getElementById("audio5").pause();
            document.getElementById("audio5").currentTime = 0;
            document.getElementById("audio5").play();
            ownDmg = 100;
            missMessage = "外したようだ。";
            criticalMessage = "急所にあたった。";
            document.getElementById("message").innerHTML = "てきのアクトハンマー。";
            document.getElementById("message").style.display = "block";
            document.getElementById("emp").innerHTML = eMP;
            setTimeout(enemyAttack, 1000);
            //急所に当たるか普通か外すか
            critical = Math.floor(Math.random() * 100);
            if(critical <= 39){
                critical = 0;
            }
            else{
                if(critical <= 59){
                    critical = 1;
                }
                else{
                    if(critical >= 60){
                        critical = 2;
                    }
                }
            }
        }
        else if((eAtk >= 80) && (eAtk <= 99)){
            let eHeal = Math.floor(Math.random() * 4);
            if(eHeal <= 2){
                if(eHP == eHPmax){
                    bossTurn0();
                }
                else{
                    thisIsItem = 1;
                    document.getElementById("audio19").pause();
                    document.getElementById("audio19").currentTime = 0;
                    document.getElementById("audio19").play();
                    ownDmg = 125;
                    criticalMessage = " てきのHPが超回復した。";
                    document.getElementById("message").innerHTML = "てきは回復の実をつかった。";
                    document.getElementById("message").style.display = "block";
                    setTimeout(enemyHeal, 1000);
                    //回復量ルーレット
                    critical = Math.floor(Math.random() * 100);
                    if(critical <= 29){
                        critical = 2;
                    }
                    else{
                        critical = 1;
                    }
                }
            }
            else{
                if(eMP == eMPmax){
                    bossTurn0();
                }
                else{
                    document.getElementById("audio19").pause();
                    document.getElementById("audio19").currentTime = 0;
                    document.getElementById("audio19").play();
                    ownDmg = 20;
                    criticalMessage = " てきのMPが超回復した。";
                    document.getElementById("message").innerHTML = "てきはMPの実をつかった。";
                    document.getElementById("message").style.display = "block";
                    setTimeout(enemyMpHeal, 1000);
                    //回復量ルーレット
                    critical = Math.floor(Math.random() * 100);
                    if(critical <= 29){
                        critical = 2;
                    }
                    else{
                        critical = 1;
                    }
                }
            }
        }
        else{
            bossTurn0();
        }
    }
}

//敵の攻撃を実行する関数

function enemyAttack(){
    buff = 0.1 * eLV + 1;
    mGP = mLV / 10 + 1;
    damege = ownDmg * buff * critical;
    damege = damege / mGP;
    if(mutekiCount != 0){
        document.getElementById("audio13").pause();
        document.getElementById("audio13").currentTime = 0;
        document.getElementById("audio13").play();
        document.getElementById("message").innerHTML = "むてきなので効かなかった。";
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            setTimeout(myTurn, 2000);
        }, 1000);
    }
    else if(critical == 0){
        document.getElementById("audio21").pause();
        document.getElementById("audio21").currentTime = 0;
        document.getElementById("audio21").play();
        document.getElementById("message").innerHTML = missMessage;
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            setTimeout(myTurn, 2000);
        }, 1000);
    }
    else if(critical == 0.5){
        document.getElementById("audio21").pause();
        document.getElementById("audio21").currentTime = 0;
        document.getElementById("audio21").play();
        document.getElementById("message").innerHTML = missMessage;
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            if(myGuard == 1){
                document.getElementById("audio14").pause();
                document.getElementById("audio14").currentTime = 0;
                document.getElementById("audio14").play();
                document.getElementById("guardphaseText").innerHTML = "GUARD SYSTEM<br><font class='hyper2'>Fully-Activated</font>";
                document.getElementById("guardphase").style.display = "block";
                setTimeout(function(){
                    document.getElementById("guardphase").style.display = "none";
                }, 1950);
                setTimeout(guardPhase, 3500);
            }
            else{
                document.getElementById("audio13").pause();
                document.getElementById("audio13").currentTime = 0;
                document.getElementById("audio13").play();
                document.getElementById("guardphase").style.display = "block";
                setTimeout(function(){
                    document.getElementById("guardphase").style.display = "none";
                }, 1950);
                setTimeout(guardPhase2, 3500);
            }
        }, 1000);
    }
    else if(critical == 2){
        document.getElementById("audio20").pause();
        document.getElementById("audio20").currentTime = 0;
        document.getElementById("audio20").play();
        document.getElementById("message").innerHTML = criticalMessage;
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            if(myGuard == 1){
                document.getElementById("audio14").pause();
                document.getElementById("audio14").currentTime = 0;
                document.getElementById("audio14").play();
                document.getElementById("guardphaseText").innerHTML = "GUARD SYSTEM<br><font class='hyper2'>Fully-Activated</font>";
                document.getElementById("enemy").style.display = "none";
                document.getElementById("guardphase").style.display = "block";
                setTimeout(function(){
                    document.getElementById("guardphase").style.display = "none";
                }, 1950);
                setTimeout(guardPhase, 3500);
            }
            else{
                document.getElementById("audio13").pause();
                document.getElementById("audio13").currentTime = 0;
                document.getElementById("audio13").play();
                document.getElementById("guardphase").style.display = "block";
                document.getElementById("enemy").style.display = "none";
                setTimeout(function(){
                    document.getElementById("guardphase").style.display = "none";
                }, 1950);
                setTimeout(guardPhase2, 3500);
            }
        }, 1000);
    }
    else{
        document.getElementById("message").style.display = "none";
        if(myGuard == 1){
            document.getElementById("audio14").pause();
            document.getElementById("audio14").currentTime = 0;
            document.getElementById("audio14").play();
            document.getElementById("guardphaseText").innerHTML = "GUARD SYSTEM<br><font class='hyper2'>Fully-Activated</font>";
            document.getElementById("guardphase").style.display = "block";
            document.getElementById("enemy").style.display = "none";
            setTimeout(function(){
                document.getElementById("guardphase").style.display = "none";
            }, 1950);
            setTimeout(guardPhase, 3500);
        }
        else{
            document.getElementById("audio13").pause();
            document.getElementById("audio13").currentTime = 0;
            document.getElementById("audio13").play();
            document.getElementById("guardphase").style.display = "block";
            document.getElementById("enemy").style.display = "none";
            setTimeout(function(){
                document.getElementById("guardphase").style.display = "none";
            }, 1950);
            setTimeout(guardPhase2, 3500);
        }
    }
}
function damegeAnimation2(){
    count = count - 1;
    if(count == 0){
        if(mHP <= 0){
            document.getElementById("audio23").pause();
            document.getElementById("audio23").currentTime = 0;
            document.getElementById("audio23").play();
            document.getElementById("damege").innerHTML = damege;
            document.getElementById("damege").style.color = "#f00";
            document.getElementById("damege").style.display = "block";
            setTimeout(function(){
                document.getElementById("damege").style.display = "none";
            }, 990);
            document.getElementById("mhp").innerHTML = 0;
        }
        else{
            document.getElementById("audio1").pause();
            document.getElementById("audio1").currentTime = 0;
            document.getElementById("audio1").play();
            document.getElementById("damege").innerHTML = damege;
            document.getElementById("damege").style.color = "#f00";
            document.getElementById("damege").style.display = "block";
            setTimeout(function(){
                document.getElementById("damege").style.display = "none";
            }, 990);
            document.getElementById("mhp").innerHTML = mHP;
        }
    }
    if(count < 0){
        clearInterval(interval);
        if(mHP <= 0){
            setTimeout(myDie, 2000);
        }
        else{
            setTimeout(myTurn, 2000);
        }
    }
    document.getElementById("me").style.display = "none";
    setTimeout(function(){
        document.getElementById("me").style.display = "block";
    }, 100);
}

//敵の回復を実行する関数

function enemyHeal(){
    if(thisIsItem == 1){
        damege = ownDmg * critical;
        eHP = eHP + damege;
        if(eHP > eHPmax){
            eHP = eHPmax;
        }
        if(critical == 2){
            soundCode = 1;
            document.getElementById("message").innerHTML = criticalMessage;
            setTimeout(function(){
                document.getElementById("message").style.display = "none";
                interval = setInterval(healAnimation2, 200);
            }, 1000);
        }
        else{
            soundCode = 2;
            document.getElementById("message").style.display = "none";
            interval = setInterval(healAnimation2, 200);
        }
    }
    else{
        buff = 0.1 * mLV + 1;
        damege = ownDmg * buff * critical;
        let a = parseInt(damege, 10);
        damege = a;
        eHP = eHP + damege;
        if(eHP > eHPmax){
            eHP = eHPmax;
        }
        if(critical == 2){
            soundCode = 1;
            document.getElementById("message").innerHTML = criticalMessage;
            setTimeout(function(){
                document.getElementById("message").style.display = "none";
                interval = setInterval(healAnimation2, 200);
            }, 1000);
        }
        else{
            soundCode = 2;
            document.getElementById("message").style.display = "none";
            interval = setInterval(healAnimation2, 200);
        }  
    }
}
function enemyMpHeal(){
    damege = ownDmg * critical;
    eMP = eMP + damege;
    if(eMP > eMPmax){
        eMP = eMPmax;
    }
    if(critical == 2){
        soundCode = 1;
        document.getElementById("audio20").pause();
        document.getElementById("audio20").currentTime = 0;
        document.getElementById("audio20").play();
        document.getElementById("message").innerHTML = criticalMessage;
        setTimeout(function(){
            document.getElementById("message").style.display = "none";
            interval = setInterval(healAnimation2, 200);
        }, 1000);
    }
    else{
        soundCode = 2;
        document.getElementById("message").style.display = "none";
        interval = setInterval(healAnimation2, 200);
    }
}
function healAnimation2(){
    count = count - 1;
    if(count == 0){
        document.getElementById("damege").innerHTML = damege;
        document.getElementById("damege").style.color = "#00ffae";
        document.getElementById("damege").style.display = "block";
        setTimeout(function(){
            document.getElementById("damege").style.display = "none";
        }, 990);
        document.getElementById("ehp").innerHTML = eHP;
        document.getElementById("emp").innerHTML = eMP;
        if(soundCode == 2){
            document.getElementById("audio2").pause();
            document.getElementById("audio2").currentTime = 0;
            document.getElementById("audio2").play();
        }
        else{
            document.getElementById("audio3").pause();
            document.getElementById("audio3").currentTime = 0;
            document.getElementById("audio3").play();
        }
    }
    if(count < 0){
        clearInterval(interval);
        setTimeout(myTurn, 2000);
    }
    document.getElementById("enemy").style.display = "none";
    document.getElementById("bg").style.backgroundImage = "url()";
    setTimeout(function(){
        document.getElementById("enemy").style.display = "block";
        document.getElementById("bg").style.backgroundImage = eURL;
    }, 100);
}

//ガードフェーズの関数

function guardPhase(){
    guardCount = 0;
    document.getElementById("stop").style.display = "block";
    document.getElementById("gauge").style.display = "block";
    document.getElementById("message").innerHTML = "ゲージが最大になるタイミングで<br>画面をクリックしよう。";
    document.getElementById("message").style.display = "block";
    interval = setInterval(guardChance, 75);
}
function guardPhase2(){
    guardCount = 0;
    document.getElementById("stop").style.display = "block";
    document.getElementById("gauge").style.display = "block";
    document.getElementById("message").innerHTML = "ゲージが最大になるタイミングで<br>画面をクリックしよう。";
    document.getElementById("message").style.display = "block";
    interval = setInterval(guardChance, 50);
}
function guardChance(){
    guardCount = guardCount + 1;
    if(guardCount == 1){
        document.getElementById("gauge1").style.display = "block";
    }
    if(guardCount == 2){
        document.getElementById("gauge2").style.display = "block";
    }
    if(guardCount == 3){
        document.getElementById("gauge3").style.display = "block";
    }
    if(guardCount == 4){
        document.getElementById("gauge4").style.display = "block";
    }
    if(guardCount == 5){
        document.getElementById("gauge5").style.display = "block";
    }
    if(guardCount == 6){
        document.getElementById("gauge6").style.display = "block";
    }
    if(guardCount == 7){
        document.getElementById("gauge7").style.display = "block";
    }
    if(guardCount == 8){
        document.getElementById("gauge8").style.display = "block";
    }
    if(guardCount == 9){
        document.getElementById("gauge9").style.display = "block";
    }
    if(guardCount == 10){
        document.getElementById("gauge10").style.display = "block";
    }
    if(guardCount == 13){
        clearInterval(interval);
        if(myGuard == 1){
            guardResult();
        }
        else if(myGuard == 0){
            guardResult2();
        }
    }
}
document.getElementById("stop").addEventListener("touchstart", stop);
function stop(){
    clearInterval(interval);
    if(myGuard == 1){
        guardResult();
    }
    else{
        guardResult2();
    }
}
function guardResult(){
    document.getElementById("stop").style.display = "none";
    document.getElementById("gauge").style.display = "none";
    document.getElementById("message").style.display = "none";
    document.getElementById("gauge1").style.display = "none";
    document.getElementById("gauge2").style.display = "none";
    document.getElementById("gauge3").style.display = "none";
    document.getElementById("gauge4").style.display = "none";
    document.getElementById("gauge5").style.display = "none";
    document.getElementById("gauge6").style.display = "none";
    document.getElementById("gauge7").style.display = "none";
    document.getElementById("gauge8").style.display = "none";
    document.getElementById("gauge9").style.display = "none";
    document.getElementById("gauge10").style.display = "none";
    if(guardCount == 10){
        document.getElementById("audio8").pause();
        document.getElementById("audio8").currentTime = 0;
        document.getElementById("audio8").play();
        cutDamege = 0.25;
        damege = damege * cutDamege;
        let a = parseInt(damege, 10);
        damege = a;
        mHP = mHP - damege;
        document.getElementById("guardphaseText").style.color = "#ff6200";
        document.getElementById("guardphaseText").innerHTML = "75% decreased";
        document.getElementById("guardphase").style.display = "block";
        setTimeout(function(){
            setTimeout(function(){
                document.getElementById("enemy").style.display = "block";
            }, 200);
            document.getElementById("guardphase").style.display = "none";
        }, 1950);
        setTimeout(function(){
            interval = setInterval(damegeAnimation2, 200);
        }, 3500);
    }
    else if(guardCount == 9){
        document.getElementById("audio4").pause();
        document.getElementById("audio4").currentTime = 0;
        document.getElementById("audio4").play();
        cutDamege = 0.5;
        damege = damege * cutDamege;
        let a = parseInt(damege, 10);
        damege = a;
        mHP = mHP - damege;
        document.getElementById("guardphaseText").style.color = "#00ff11";
        document.getElementById("guardphaseText").innerHTML = "50% decreased";
        document.getElementById("guardphase").style.display = "block";
        setTimeout(function(){
            setTimeout(function(){
                document.getElementById("enemy").style.display = "block";
            }, 200);
            document.getElementById("guardphase").style.display = "none";
        }, 1950);
        setTimeout(function(){
            interval = setInterval(damegeAnimation2, 200);
        }, 3500);
    }
    else if(guardCount == 11){
        document.getElementById("audio4").pause();
        document.getElementById("audio4").currentTime = 0;
        document.getElementById("audio4").play();
        cutDamege = 0.5;
        damege = damege * cutDamege;
        let a = parseInt(damege, 10);
        damege = a;
        mHP = mHP - damege;
        document.getElementById("guardphaseText").style.color = "#00ff11";
        document.getElementById("guardphaseText").innerHTML = "50% decreased";
        document.getElementById("guardphase").style.display = "block";
        setTimeout(function(){
            setTimeout(function(){
                document.getElementById("enemy").style.display = "block";
            }, 200);
            document.getElementById("guardphase").style.display = "none";
        }, 1950);
        setTimeout(function(){
            interval = setInterval(damegeAnimation2, 200);
        }, 3500);
    }
    else{
        document.getElementById("audio21").pause();
        document.getElementById("audio21").currentTime = 0;
        document.getElementById("audio21").play();
        cutDamege = 0.75;
        damege = damege * cutDamege;
        let a = parseInt(damege, 10);
        damege = a;
        mHP = mHP - damege;
        document.getElementById("guardphaseText").style.color = "#289bed";
        document.getElementById("guardphaseText").innerHTML = "25% decreased";
        document.getElementById("guardphase").style.display = "block";
        setTimeout(function(){
            setTimeout(function(){
                document.getElementById("enemy").style.display = "block";
            }, 200);
            document.getElementById("guardphase").style.display = "none";
        }, 1950);
        setTimeout(function(){
            interval = setInterval(damegeAnimation2, 200);
        }, 3500);
    }
}
function guardResult2(){
    document.getElementById("stop").style.display = "none";
    document.getElementById("gauge").style.display = "none";
    document.getElementById("message").style.display = "none";
    document.getElementById("gauge1").style.display = "none";
    document.getElementById("gauge2").style.display = "none";
    document.getElementById("gauge3").style.display = "none";
    document.getElementById("gauge4").style.display = "none";
    document.getElementById("gauge5").style.display = "none";
    document.getElementById("gauge6").style.display = "none";
    document.getElementById("gauge7").style.display = "none";
    document.getElementById("gauge8").style.display = "none";
    document.getElementById("gauge9").style.display = "none";
    document.getElementById("gauge10").style.display = "none";
    if(guardCount == 10){
        document.getElementById("audio8").pause();
        document.getElementById("audio8").currentTime = 0;
        document.getElementById("audio8").play();
        cutDamege = 0.8;
        damege = damege * cutDamege;
        let a = parseInt(damege, 10);
        damege = a;
        mHP = mHP - damege;
        document.getElementById("guardphaseText").style.color = "#ff6200";
        document.getElementById("guardphaseText").innerHTML = "20% decreased";
        document.getElementById("guardphase").style.display = "block";
        setTimeout(function(){
            setTimeout(function(){
                document.getElementById("enemy").style.display = "block";
            }, 200);
            document.getElementById("guardphase").style.display = "none";
        }, 1950);
        setTimeout(function(){
            interval = setInterval(damegeAnimation2, 200);
        }, 3500);
    }
    else if(guardCount == 9){
        document.getElementById("audio4").pause();
        document.getElementById("audio4").currentTime = 0;
        document.getElementById("audio4").play();
        cutDamege = 0.9;
        damege = damege * cutDamege;
        let a = parseInt(damege, 10);
        damege = a;
        mHP = mHP - damege;
        document.getElementById("guardphaseText").style.color = "#00ff11";
        document.getElementById("guardphaseText").innerHTML = "10% decreased";
        document.getElementById("guardphase").style.display = "block";
        setTimeout(function(){
            setTimeout(function(){
                document.getElementById("enemy").style.display = "block";
            }, 200);
            document.getElementById("guardphase").style.display = "none";
        }, 1950);
        setTimeout(function(){
            interval = setInterval(damegeAnimation2, 200);
        }, 3500);
    }
    else if(guardCount == 11){
        document.getElementById("audio4").pause();
        document.getElementById("audio4").currentTime = 0;
        document.getElementById("audio4").play();
        cutDamege = 0.9;
        damege = damege * cutDamege;
        let a = parseInt(damege, 10);
        damege = a;
        mHP = mHP - damege;
        document.getElementById("guardphaseText").style.color = "#00ff11";
        document.getElementById("guardphaseText").innerHTML = "10% decreased";
        document.getElementById("guardphase").style.display = "block";
        setTimeout(function(){
            setTimeout(function(){
                document.getElementById("enemy").style.display = "block";
            }, 200);
            document.getElementById("guardphase").style.display = "none";
        }, 1950);
        setTimeout(function(){
            interval = setInterval(damegeAnimation2, 200);
        }, 3500);
    }
    else{
        document.getElementById("audio21").pause();
        document.getElementById("audio21").currentTime = 0;
        document.getElementById("audio21").play();
        cutDamege = 1;
        damege = damege * cutDamege;
        let a = parseInt(damege, 10);
        damege = a;
        mHP = mHP - damege;
        document.getElementById("guardphaseText").style.color = "#289bed";
        document.getElementById("guardphaseText").innerHTML = "Crashed_";
        document.getElementById("guardphase").style.display = "block";
        setTimeout(function(){
            setTimeout(function(){
                document.getElementById("enemy").style.display = "block";
            }, 200);
            document.getElementById("guardphase").style.display = "none";
        }, 1950);
        setTimeout(function(){
            interval = setInterval(damegeAnimation2, 200);
        }, 3500);
    }
}

//死んだときの関数

function bossDie(){
    document.getElementById("audio0").pause();
    document.getElementById("audio101").play();
    document.getElementById("audio201").play();
    document.getElementById("message").innerHTML = "勝利！！<br><font onclick='result1()'>次へ</font>"
    document.getElementById("message").style.display = "block";
    document.getElementById("enemy").style.display = "none";
}
function result1(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = exp + "EXP手に入れた。<br><font onclick='expCheck()'>次へ</font>";
    mExp = mExp + exp;
}
function result2(){
    document.getElementById("audio24").pause();
    document.getElementById("audio24").currentTime = 0;
    document.getElementById("audio24").play();
    let nextUP = expNext - mExp;
    document.getElementById("message").innerHTML = "Lv." + mLV + "になった！<br>NEXT" + nextUP + "EXP<br><font onclick='result3()'>次へ</font>";
}
function result3(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "最大HPが" + mHPmax + "になった。<br>最大MPが" + mMPmax + "になった。<br><font onclick='result4()'>次へ</font>";
}
function result4(){
    if(eCode == 0){
        document.getElementById("audio17").pause();
        document.getElementById("audio17").currentTime = 0;
        document.getElementById("audio17").play();
        document.getElementById("audio0").volume = 0;
        document.getElementById("audio0").play();
        document.getElementById("audio101").volume = 1;
        fadeIn();
        document.getElementById("clear").style.display = "block";
    }
    else{
        document.getElementById("audio17").pause();
        document.getElementById("audio17").currentTime = 0;
        document.getElementById("audio17").play();
        //マップに戻ったり次の処理に戻ったり
    }
}
function expCheck(){
    if(mExp >= expNext){
        mLV = mLV + 1;
        mHPmax = mHPmax + 50;
        mMPmax = mMPmax + 1;
        //新しい技を覚えるときはコマンドリストに<font>要素を追加
        //技が強化されるときはその技の<font>要素を書き換える
        mExp = mExp - expNext;
        expNext = expNext + 500;
        if(mExp >= expNext){
            expCheck();
        }
        else{
            result2();
        }
    }
    else{
        result3();
    }
}
function myDie(){
    document.getElementById("audio0").pause();
    document.getElementById("audio101").play();
    document.getElementById("audio200").play();
    document.getElementById("message").innerHTML = "敗北...<br><font onclick='result5()'>次へ</font>"
    document.getElementById("message").style.display = "block";
    document.getElementById("me").style.display = "none";
    document.getElementById("enemy").style.display = "none";
}
function result5(){
    if(eCode == 0){
        document.getElementById("audio17").pause();
        document.getElementById("audio17").currentTime = 0;
        document.getElementById("audio17").play();
        document.getElementById("audio0").volume = 0;
        document.getElementById("audio0").play();
        document.getElementById("audio101").volume = 1;
        fadeIn();
        document.getElementById("clear").style.display = "block";
    }
    else{
        document.getElementById("audio17").pause();
        document.getElementById("audio17").currentTime = 0;
        document.getElementById("audio17").play();
        //マップに戻ったり次の処理に戻ったり
    }
}
//コマンド画面を開く関数        

function command(){
    if(commandLock == 0){
        document.getElementById("audio17").pause();
        document.getElementById("audio17").currentTime = 0;
        document.getElementById("audio17").play();
        document.getElementById("command").style.display = "block";
        document.getElementById("me").style.display = "none";
    }
    else{
        document.getElementById("audio16").pause();
        document.getElementById("audio16").currentTime = 0;
        document.getElementById("audio16").play();
    }
}
function attack(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("command").style.display = "none";
    document.getElementById("commandA").style.display = "block";
}
function magic(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("command").style.display = "none";
    document.getElementById("commandM").style.display = "block";
}
function item(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("command").style.display = "none";
    document.getElementById("commandI").style.display = "block";
}
function guard(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("command").style.display = "none";
    document.getElementById("commandG").style.display = "block";
}

//説明画面を表示する関数

function explanationA1(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "ごくごく一般的なナイフ。<br>必ずあたるが、いりょくはひくい。<br>いりょく 40";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandA").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandA").style.display = "block";
    }, 2000)
}
function explanationA2(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "じまんの剣をたてに大きくふるわざ。<br>外しやすいが、急所にあたりやすい。<br>いりょく 120";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandA").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandA").style.display = "block";
    }, 2000)
}
function explanationM1(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "きょだいなライターであぶるわざ。<br>いりょく 70<br>タイプ ほのお<br>消費MP 19";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandM").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandM").style.display = "block";
    }, 2000)
}
function explanationM2(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "あつい日はバケツで水をまこう。<br>いりょく 80<br>タイプ みず<br>消費MP 23";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandM").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandM").style.display = "block";
    }, 2000)
}
function explanationM3(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "ゆきがっせんだ。<br>いりょく 40<br>タイプ こおり<br>消費MP 10";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandM").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandM").style.display = "block";
    }, 2000)
}
function explanationM4(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "またの名を「でんじかそくほう」という。<br>いりょく 185<br>タイプ でんき<br>消費MP 48";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandM").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandM").style.display = "block";
    }, 2000)
}
function explanationM5(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "2ターンの間むてきになるわざ。<br>消費MP 70";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandM").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandM").style.display = "block";
    }, 2000)
}
function explanationM6(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "自分のHPを回復するわざ。<br>Lvにおうじて効果がおおきくなる。<br>いりょく 50<br>消費MP 24";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandM").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandM").style.display = "block";
    }, 2000)
}
function explanationI1(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "HPが150回復するのみもの。";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandI").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandI").style.display = "block";
    }, 2000)
}
function explanationI2(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "5ターンの間HPが50ずつ回復するようになるふしぎな種。<br>かさねてつかうことはできない。";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandI").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandI").style.display = "block";
    }, 2000)
}
function explanationI3(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "4ターンの間みずタイプのからだになれる羽衣。<br>ほかの羽衣とかさねてつかうことはできない。";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandI").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandI").style.display = "block";
    }, 2000)
}
function explanationI4(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "4ターンの間こおりタイプのからだになれる羽衣。<br>ほかの羽衣とかさねてつかうことはできない。";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandI").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandI").style.display = "block";
    }, 2000)
}
function explanationG1(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("message").innerHTML = "つぎのガードフェーズが超きょうかされる。";
    document.getElementById("message").style.display = "block";
    document.getElementById("commandG").style.display = "none";
    setTimeout(function(){
        document.getElementById("message").style.display = "none";
        document.getElementById("commandG").style.display = "block";
    }, 2000)
}

//コマンド画面に戻る用の関数

function back1(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("command").style.display = "none";
    document.getElementById("me").style.display = "block";
}
function back2(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("commandA").style.display = "none";
    document.getElementById("command").style.display = "block";
}
function back3(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("commandM").style.display = "none";
    document.getElementById("command").style.display = "block";
}
function back4(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("commandI").style.display = "none";
    document.getElementById("command").style.display = "block";
}
function back5(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.getElementById("commandG").style.display = "none";
    document.getElementById("command").style.display = "block";
}

//背景色変更

function bgcolorRedAnimate(){
    document.getElementById("body").classList.remove("redAnimate", "blueAnimate", "greenAnimate");
    document.getElementById("body").classList.add("redAnimate");
}
function bgcolorBlueAnimate(){
    document.getElementById("body").classList.remove("redAnimate", "blueAnimate", "greenAnimate");
    document.getElementById("body").classList.add("blueAnimate");
}
function bgcolorRainbowAnimate(){
    document.getElementById("body").classList.remove("redAnimate", "blueAnimate", "greenAnimate", "rainbowAnimate");
    document.getElementById("body").classList.add("rainbowAnimate");
    document.getElementById("cover").style.display = "block";
    setTimeout(function(){
        document.getElementById("cover").style.display = "none";
    }, 1500);
}
function bgcolorReset(){
    document.getElementById("body").classList.remove("redAnimate", "blueAnimate", "greenAnimate");
    document.getElementById("body").style.animation = "none";
    document.getElementById("body").style.backgroundColor = "#000";
}

//体験版限定

document.getElementById("clear").addEventListener("touchstart", oto);
function fadeIn(){
    let vl = document.getElementById("audio0").volume;
    let vl2 = document.getElementById("audio101").volume;
    if (vl < 1.0){
        document.getElementById("audio0").volume = vl + 0.1;
        setTimeout(fadeIn, 350);
    }
    if(vl2 > 0){
        document.getElementById("audio101").volume = vl2 - 0.1;
    }
}
function oto(){
    document.getElementById("audio16").pause();
    document.getElementById("audio16").currentTime = 0;
    document.getElementById("audio16").play();
}

//リロード

function reload(){
    location.href = "index.html";
}

//全画面モード

function fullScreen(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.documentElement.requestFullscreen();
    document.getElementById("side").style.display = "none";
    document.getElementById("side2").style.display = "block";
}
function exitFullScreen(){
    document.getElementById("audio17").pause();
    document.getElementById("audio17").currentTime = 0;
    document.getElementById("audio17").play();
    document.exitFullscreen();
    document.getElementById("side").style.display = "block";
    document.getElementById("side2").style.display = "none";
}
