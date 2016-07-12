# Syncano at FullStack 2016
This is the subject of the "5 Minute Backend with Node and Syncano" Lightning Talk presented by Todd Wacker

To complete the exercise, follow the steps below:

1. Sign up for a [Syncano Account](https://www.syncano.io/).
2. Clone this repo: `git clone https://github.com/syncano-community/syncano-fullstackcon.git`
3. Point your browser to the `index.html` file included in the repo.
4. In another tab, navigate to your Syncano Dashboard. 
5. Create a new Syncano Instance and give it whatever name you want.
6. Copy your Syncano Account Key by clicking on the profile picture at the top right corner of your Syncano Dashboard and selecting "Copy Account Key".
7. Go to the tab with your `index.html` file open and click "Link Account". Paste your Account Key into the space provided and enter your Instance Name. Submit to link your account.
8. In your Syncano Dashboard, create a new class called `news_item`. For the schema, give it a `title` (string), `url` (string), and `upvotes` (integer).
9. Create 3 News Item Data Objects either in your Syncano Dashboard or by selecting the 'Add a News Item` link in your `index.html` file.
10. Upvote some of the News Items. Notice how the order changes accordingly.
11. Create another News Item titled `should delete` and give it whatever url you want. Don't upvote it.
12. Navigate back to your Syncano Dashboard and create a new Script by selecting "Scripts" in the left nav. Label the Script `news_item_clean_up` and select `NodeJS (latest v 1.0)` as the runtime.
13. Copy the following code and paste it into the code editor:
    ```
    var Syncano = require('syncano');
    var connection = Syncano({accountKey: CONFIG.accountKey});
    var news_items;
    
    connection.DataObject.please().list({instanceName: CONFIG.instanceName, className: CONFIG.className}).then(function(items) {
        items.forEach(function(item) {
           if (item.upvotes === 0) {
               connection.DataObject.please().delete({id: item.id, instanceName: CONFIG.instanceName, className: CONFIG.className}).then(function(){
                  console.log("Item successfully deleted"); 
               });
           } 
        });    
    });
    ```
14. Set your CONFIG variables on the right. You will need one for `accountKey` (string), `instanceName` (string), and `className` (string). Fill in your `accountKey` and `instanceName` and use `news_item` for the `className`. Click the blue "Save" button at the top.
15. Click the blue "Run" button at the top.
16. Navigate back to your `index.html` file. The "should delete" News Item should be gone.
17. Read more about what Syncano can do in the [docs](http://docs.syncano.io/).
