# Rollupのメモ

## Rollup を使って npmモジュール

Rollup のプラグインを使いこなすのがポイント。

### rollup-plugin-node-resolve
- ``node_modules/``ディレクトリ内のパッケージもモジュールの検索対象に含んでくれる。
- ``jsnext: true``を設定すると、各モジュールの``package.json``の``jsnext:main``に指定されている ES6 module で書かれているコンパイル前のソースを参照する。

### rollup-plugin-commonjs
- CJSでしか使えない npm パッケージを使えるようになる。

### rollup-plugin-replace
- 

## その他の npmモジュール

### debug
基本的には、CJSでしか使えないモジュールだけど、``rollup-plugin-commonjs``の力で、ブラウザでも使えるようにして利用する。
開発中にだけログを吐き出すような設定が可能で便利。
カラー付き！






DOMContentLoaded とかをうまく考えないと、bodyに新しいエレメントを追加できない。
headでscript読み込んで、即bodyにエレメント追加したい。
パスワードは案内ページで暗号化できるようにしておいて、
その暗号化されたパスワード一覧をtextかなんかで読み込むようにして、プログラムで使うようにする。

bower test