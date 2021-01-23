prediction_1=""
prediction_2=""
Webcam.set
({
width:350,
height:300,
dest_width:345,
dest_height:300,
image_format:'png',
png_quality:100
});

//Setting the webcamera for capturing the image, (Width & Height, Image Format and quality of Image), adjusting the height and width of camera using destination height and width command//

camera=document.getElementById("camera");
Webcam.attach("camera");

//adding the camera into a variable for further use, attaching the set webcamera to the html id "camera",//

function cap_pic()
{
    Webcam.snap(function (data_uri)
    {
        document.getElementById("result").innerHTML="<img id='captured_pic' src="+data_uri+">";
    });
    
}

//Taking the picture and storing the src in a variable called data_uri, and then adding the same variable to the result div//

console.log("ml5.version",ml5.version);
//Telling the console and the javascript that we are using ml5 version library to do the neural network code, the first one in double quotes is for the console and the second one is the real one that is being told to the computer//

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/plunmJsJ0/model.json",modelLoaded);
//Adding the teachable machines link to the image classifier command, a ml5 predefined command, to store it in the js for further use, modelloaded is a command that tells js that the link has loaded//

function modelLoaded()
{
    console.log("Model had Loaded");
}

//writing in the console that the model has loaded//

function speak()
{
    var synth=window.speechSynthesis;
    var speak_data_1="The first prediction is " + prediction_1;
    var speak_data_2="The second prediction is " + prediction_2;
    var utterance=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterance);
}

function guess_pic()
{
    img=document.getElementById("captured_pic");
    classifier.classify(img,getResult);
}

function getResult(error,result)
{
    if (error)
    {
        console.log(error);
    }
    else 
    {
        console.log(result);
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        document.getElementById("result_1").innerHTML=prediction_1;
        document.getElementById("result_2").innerHTML=prediction_2;
        speak();

        if(prediction_1=="Happy")
        {
        document.getElementById("update_emoji_1").innerHTML="&#128512";
        }
        if(prediction_1=="Sad")
        {
        document.getElementById("update_emoji_1").innerHTML="&#128532";
        }
        if(prediction_1=="Angry")
        {
        document.getElementById("update_emoji_1").innerHTML="&#128548;";
        }
        if(prediction_2=="Happy")
        {
        document.getElementById("update_emoji_2").innerHTML="&#128512";
        }
        if(prediction_2=="Sad")
        {
        document.getElementById("update_emoji_2").innerHTML="&#128532";
        }
        if(prediction_2=="Angry")
        {
        document.getElementById("update_emoji_2").innerHTML="&#128548;";
        }
    }
}