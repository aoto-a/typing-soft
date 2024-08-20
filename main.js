// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
// spanを取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
// 文章を入れる配列
const textLists = [
    'Hello World',
    'This is my App',
    'How are you'
];
const createText = () => {
    // タイピングをクリアにする
    typed = '';
    typedfield.textContent = typed;
    // 配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textLists.length);
    untyped =textLists[random];
    untypedfield.textContent = untyped;
};

// 入力判定
// 入力された文字を取得
const keyPress = e => {
    // 間違った場合
    if(e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }
    // 正しい場合
    // スコアのインクリメント
    score++;
    wrap.classList.remove('mistyped');
    typed  += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;
    // 文章がなくなったら新しい文章を表示
    if(untyped === '') {
        createText();
    }   
};

// タイピングスキルのランクを判定する
const rankCheck = score => {
    // テキストを格納する変数を作る
    let text = '';
    // スコアに応じて異なるメッセージを変数textに格納する
    if(score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${100 - score}文字です。`;
    } else if(score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${100 - score}文字です。`;
    } else if(score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます！`;
    }
    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字を打てました！\n${text}\n【OK】リトライ　/　【キャンセル】終了`;
};

// タイピングゲームを終了
const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));
    // OKボタンをクリックしたらリロードする
    if(result == true) {
        window.location.reload();
    }
};

// カウントダウンタイマー
const timer = () => {
    // タイマー部分のp要素を取得する
    let time = count.textContent;

    const id = setInterval(() => {
        // カウントダウンする
        time--;
        count.textContent = time;
        // カウントが0になったらタイマーを停止する
        if(time <= 0) {
            gameOver(id);
        }
    }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
    // カウントダウンタイマーを開始する
    timer();
    // 文章をランダム表示
    createText();
    // スタートボタンを非表示
    start.style.display = 'none';
    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
