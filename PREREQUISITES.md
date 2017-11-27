# Prerequisites for Developing Locally

 > Clone the project `git clone git@github.com:peter-mouland/svg.git`
 
 > Node `v8.1`
 
 > npm `v5.0.3`

Before you can start working on components there are a number of dependencies that need to be installed on your machine.

---

## Mac/Linux Set Up
 > [Not a Mac/Linux user? Head to the Windows set up](#windows-set-up)

### Regression Testing Dependencies

Java SE Development Kit (JDK) will be needed support regression testing, please download and install the latest:
 * http://www.oracle.com/technetwork/java/javase/downloads/index.html

PhantomJS v2 i required for tests.  If you haven't already got it installed please do the following:

 * `brew install upx`

Install Cairo (a native graphics library) required for regression testing.
 * `brew update`
 * `brew install pkg-config`
 * `brew install cairo`

Configure command line tools for Node's native build tool (depends on Python 2.7 as well)
 * `xcode-select --install`
 
### Cross-Browser Testing Dependencies

You will need the following environment variables. Required for regression testing.
You should be able to get these from your Product Manager or QA if you have one.

 * `BROWSERSTACK_ACCESS_KEY=team-access-key`
 * `BROWSERSTACK_USERNAME=team-name`

If you add these to your `~/.bash_profile` then you wont need to worry about them again.

### Build Dependencies

 * `npm i -g lerna` : Install Lerna (to help manage the mono-repo)
 * `npm run init` : Install dependencies

### Test Dependencies

You will also need to edit your hosts file (required for safari browserstack connection):

 * sudo vi /etc/hosts
 * add `127.0.0.1       local.dev.co.uk`

---

## Windows Set Up

Install chocolatey, a software package manager for Windows:
* [https://chocolatey.org/install](https://chocolatey.org/install)

### Regression Testing Dependencies

Java SE Development Kit (JDK) will be needed support regression testing, please download and install the latest:
 * http://www.oracle.com/technetwork/java/javase/downloads/index.html

PhantomJS v2 i required for tests.  If you haven't already got it installed please do the following:

 * `choco install phantomjs`
Instructions for adding phantomjs to PATH and testing installation:
[https://www.joecolantonio.com/2014/10/14/how-to-install-phantomjs/](https://www.joecolantonio.com/2014/10/14/how-to-install-phantomjs/)

Install Cairo (a native graphics library) required for regression testing.
 * `npm i -g node-gyp`
 * `choco install -y python2 gtk-runtime microsoft-build-tools libjpeg-turbo` (run as Administrator)
 * You will need the cairo library which is bundled in GTK. Download the GTK 2 bundle for [Win32](http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip) or [Win64](http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip). Unzip the contents in `C:\GTK`
 * `npm i canvas`
 [Documentation - should you need it](https://github.com/Automattic/node-canvas/wiki/Installation---Windows#install-with-chocolatey)

Configure command line tools for Node's native build tool (depends on Python 2.7 as well)
 * `npm i -g --production windows-build-tools`
 
### Cross-Browser Testing Dependencies

You will need the following environment variables. Required for regression testing.
You should be able to get these from your Product Manager or QA if you have one.

 * `set BROWSERSTACK_ACCESS_KEY=team-access-key`
 * `set BROWSERSTACK_USERNAME=team-name`

If you add these to your console's config or user variables table (within system properties > environment variables), then you wont need to worry about them again.

### Build Dependencies

 * `npm i -g lerna` : Install Lerna (to help manage the mono-repo)
 * `npm run init` : Install dependencies

> NOTE: If you encounter node-sass errors while building the packages, run `npm rebuild node-sass`

### Test Dependencies

You will also need to edit your hosts file (required for safari browserstack connection):

 * C:\Windows\System32\drivers\etc\hosts (open in Notepad run as administrator)
 * add `127.0.0.1       local.dev.co.uk`
