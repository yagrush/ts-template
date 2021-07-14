Windows10+WLS2でReact+TypeScript開発環境を整備する

# Windows10 PCを用意する。

HomeエディションでもOK

# WSL2を利用してWindows内に仮想Linuxを構築する。

↓マイクロソフト公式のセットアップ手順を実施する。<br />
「手動インストールの手順」より下の部分。<br />
入れるLinuxの種類は`Ubuntu 20.04 LTS`にする。<br />
https://docs.microsoft.com/ja-jp/windows/wsl/install-win10#manual-installation-steps <br />

Linuxユーザーのパスワードは、めんどくさいので設定しなくてもよい。


# (Windows) 開発ソフト VSCode をインストールする。
https://azure.microsoft.com/ja-jp/products/visual-studio-code/ <br />

## VSCodeを日本語化する。

https://rfs.jp/sb/vsc/vsc-japanese.html <br />

1. Visual Studio Codeを開く
1. メニューから［View］-［Command Palette］を選択
1. ［Configure Display Language］を選択
1. ［Install Additional Laugage］を選択
1. サイドバーに拡張言語パックが表示されます。
1. サイドバーから［Japanese Language Pack for Visual Studio Code］を探し、［Install］ボタンをクリック
1. 右下にポップアップウィザードが表示されるので、［Restart Now］をクリック
1. VS Codeが再起動します。

## VSCodeで、常に新しいタブでファイルを開くようにする。

https://masizime.com/blog/vscode-enablepreview <br />
1. 設定 → 設定項目の検索ボックスに workbench.editor.enablePreview と検索して、チェックボックスを外す

# (Linux) 入っているソフトを最新に更新する。

以下のコマンドを打つ。

```
sudo apt update
```

# (Linux) gitの初期設定をする。

おそらく最初からgitが入っていると思う。<br />
なので、設定だけする。<br />
<br />
以下のコマンドを打つ。

```
git config --global user.name "Taro yagrush"
git config --global user.email "yagrush@users.​noreply.github.com"
git config --global core.editor 'vim -c "set fenc=utf-8"'
git config --global color.diff auto
git config --global color.status auto
git config --global color.branch auto
git config --global push.default simple
```

# (Linux) githubへの認証設定を行う。

```
mkdir ~/.ssh
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -C "yagrush@users.​noreply.github.com"
cat id_rsa.pub
```

こうすると、暗号のようなキーがドバっと表示される。<br />
その表示されたsshキーを、WEBブラウザでgithubにログインして、ユーザー設定画面を開き、SSH Keyの登録を行う。<br />

終わったら手元のLinuxのコマンドウィンドウに戻り、次のコマンドを打つ。

```
touch ~/.ssh/config
chmod 600 ~/.ssh/config
vim ~/.ssh/config
```

そうすると、vimというコマンドウィンドウ内テキストエディタが起動して configファイルを開くので、以下の文言を追記して保存し終了する。

```
Host github.com
  HostName github.com
  IdentityFile ~/.ssh/id_rsa_yagrush
  User yagrush
```

vimが閉じたら、引き続き以下のコマンドを打つ。

```
ssh -T git@github.com
```

何か質問されたら `yes` と打ち込めばOK。

# (Linux) TypeScript言語で開発に必要なソフトをインストールする

```
sudo apt update
sudo apt install nodejs npm
sudo npm install -g yarn
sudo npm install -g n
sudo n latest
```

# このプロジェクトをgitでクローン（ダウンロード）する。

```
git clone git@github.com:yagrush/ts-template.git
```

# このプロジェクトの初期設定を行う。

```
cd ts-template

# 追加で必要な開発ソフトをダウンロードする
npm install

# 開発用ローカルサーバーを起動する
npx webpack serve

# ブラウザで https://localhost:8088/ にアクセスしてみる
# シンプルなログイン画面が表示されたら成功。
```
