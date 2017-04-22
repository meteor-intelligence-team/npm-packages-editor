Peditor: npm packages editor
===================


This tool is based on Create React App and we configured it to make it easy to create, test and publish your React components to npm.

----------


Getting started!
-------------

The first step is to clone this repo and run that command in the root of the Peditor to install every dependencies

    npm install
And then start the app with

    npm start
You can use yarn if you are more confortable with it.

<i class="icon-list"></i> App Structure
-------------

Our editor is structured this way

    npm-packages-editor/
	 lib/
	   components/
	     YourComponent/
		index.js
		package.json
		YourComponent.js
		README.md
	 node_modules/
	   package.json
	   public/
	     index.html
	     favicon.ico
	 src/
	   App.css
	   App.js
	   App.test.js
	   index.css
	   index.js
	   logo.svg
	   node_modules/
	      components/
	         YourComponent/
		    index.js
		    package.json
		    YourComponent.js
		    README.md
	  .babelrc
	  package.json
	  README.md
      

<i class="icon-code"></i> Development - the src folder
-------------

When your develop your components, you should only work in the `src/` folder. This is where your can display and modify your components.

You need to create a folder `YourComponent/` (or whatever name you want to give it) in the `src/node_modules/components/`
The file `App.js` is here to display your component after you import it.

Pretty simple. Don't forget to build your package.json in your component for your dependencies. 
Here your have two choices to make it work. You can install your dependencies in the root of the app of in the component folder.

If you choose to install them in your component folder, you'll have to delete it before you build it for production. Or make a .gitignore file. We advice you to install them at the root of the app.

When you finished, you can push your code to Github, in your repo from the folder `YourComponent/` (or whatever....)

<i class="icon-refresh"></i> Compile - the lib folder
-------------

Once you have finished to create your component and everything works... Well, Rock'n'Roll, let's publish it.
Don(t forget to delete the `node_modules/` folder in your component folder or you'll end up with an error. So, from the root of the editor, your can simply run

    npm run lib

And, magic, with create-react-app it compiles your component ready to publish in the `lib/` folder. 
After that, just go in the `lib/components/YourComponent/` folder and run

    npm publish

All done and good to go. Now your can install your component wherever you want with 

    npm install --save your-component

even in the editor if your want to test it right away.



