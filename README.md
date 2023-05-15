# terribly tiny tales assignment
## Assignment by Sushant Kumar
On first rendering, submit button is there on the main screen.After clicking on the submit button, the user will be directed to the working page.
## Explanation of the Working code
After clicking on the submit button, a function will be called where the function contains fetching of data done using axios. Then the data is split into words and we have calculated the frequency of each words appearing in the data set.
Then this all words are stored in the form of the object and these object have been used after converting to object, entires function and has been used as array of  array having key value pair.
Then this data has been sort in descending order using sort function.
Now using this data, a histogram has been plotted by using apex-charts modules.
The chart is plotted of Frequency of the words and the words. 
When this chart is plotted, it is using the useEffect of react hook.
In this hook, an instance of chart class has been created .
At the end of this react hook, a destructor has been made and this destructor is used to delete the previous data when it fetch the new data.
useEffect hook is having a dependency which is taking top 20 elements having higher frequency in our data set. 

## Export Button
This button is used to create a csv file and on clicking on this export button, download function is called that downloads the csv file in our system.
