/********************************************************/
/*                                       				*/
/*  Author: Patrick Stel                 				*/
/*  Date: 02-07-20022                    				*/
/*  Purpose: sportlink data fetching     				*/
/*	Version: V1.0 - Season 2021 - 2022   				*/
/*			 V2.0 - Season 2022 - 2023 - New Styling	*/
/* 	License: Apache License 2.0			 				*/
/*                                       				*/
/********************************************************/

//const validationChecker = ('; '+document.cookie).split(`; activated=`).pop().split(';')[0];

//if(validationChecker != 'true'){
	//window.location = 'index.html';
//}

var sportlink_clientID = 'client_id=iLqhgc5Npa'
var sportlink_url = 'https://data.sportlink.com/'
var programma_dagen = '7'
var emptyCheck = 'start'
var emptyDayCheck = 'start'

var scrollListHeight;

var toekomstDate = new Date();
var toekomst = (toekomstDate.setHours(toekomstDate.getHours()+2))
var toekomstUren = ("0" + toekomstDate.getHours()).slice(-2);

var toekomstDate2 = new Date();
var toekomst2 = (toekomstDate2.setHours(toekomstDate2.getHours()-2))
var toekomstUren2 = ("0" + toekomstDate2.getHours()).slice(-2);

var myPastDate=new Date();
myPastDate.setDate(myPastDate.getDate() - 6);//myPastDate is now 5 days in the past
var pastDateDay = ("0" + myPastDate.getDate()).slice(-2);
var pastDateMonth = ("0" + (myPastDate.getMonth() + 1)).slice(-2);
var pastDateYear = myPastDate.getFullYear();

var pastMatchDate = (pastDateYear + '-' + pastDateMonth + '-' +  pastDateDay);

var today = new Date();
var dag = ("0" + today.getDate()).slice(-2);
var maand = ("0" + (today.getMonth() + 1)).slice(-2);
var minuten = ("0" + today.getMinutes()).slice(-2);
var uren = ("0" + today.getHours()).slice(-2);
var seconden = ("0" + today.getMinutes()).slice(-2);
var vandaag = today.getFullYear()+'-'+ maand +'-'+ dag;
var todayDate = today.getFullYear()+'-'+ maand +'-'+ dag +'T'+ toekomstUren2 + ':' + minuten + ':' + seconden;
var todayDatePlus = today.getFullYear() + '-' + maand + '-' + dag + 'T' + toekomstUren + ':' + minuten + ':' + seconden
var matchProgramTimeNow = (vandaag + 'T' + uren + ':' + minuten + ':00');

//Cleaned Function
function fetchMatchInformation(){
	$.ajax({
		url: sportlink_url + "programma?gebruiklokaleteamgegevens=NEE&eigenwedstrijden=JA&thuis=JA&uit=NEE&" + sportlink_clientID,
		//url: "http://192.168.0.125/wvv_v2/test_feed_wedstrijdinfo.html",
		async: false,
		dataType: 'json',
		success: function(matchInfo) {
			for (let i3 = 0; i3 < Object.keys(matchInfo).length; i3++) {
				var thuisteam = matchInfo[i3].thuisteam;
				var uitteam = matchInfo[i3].uitteam;
				var aanvangstijd = matchInfo[i3].aanvangstijd;
				var veld = matchInfo[i3].veld;
				var kleedkameruitteam = matchInfo[i3].kleedkameruitteam;
				var kleedkamerthuisteam = matchInfo[i3].kleedkamerthuisteam;
				var matchdatum = matchInfo[i3].wedstrijddatum.split('T')[0];
				var matchtijd = matchInfo[i3].wedstrijddatum.split('T')[1];
				var matchtijd_short = matchtijd.split(':')[0];
				var amountGames = Object.keys(matchInfo).length;
				var calulContent = amountGames * 50 + 100;

				if(Date.parse(matchdatum) == Date.parse(vandaag)){
					
					var emptyDayCheck = 'WedstrijdDag';

					if((matchtijd > toekomstUren2 && matchtijd < toekomstUren) || (matchtijd_short === toekomstUren)){
						var emptyCheck = 'Wedstrijden';

						//Fetch the DIV
						var el = document.getElementById("rcorners_matchinfo");
						
						//Create placeholderDiv
						var node = document.createElement("div");
						node.setAttribute('id', 'placeholderDiv');
						
						//Create datumDiv
						var datumDiv = document.createElement("div");
						datumDiv.setAttribute('id', 'datumUitslag');
						datumDiv.innerHTML = ("<span>" + aanvangstijd + "</span>");

						//Create thuisteamNameDiv
						var thuisteamDiv = document.createElement("div");
						thuisteamDiv.setAttribute('id', 'thuisteam_wedstrijdinfo');
						thuisteamDiv.innerHTML = (thuisteam);
						
						//Create thuisKleedkamerDiv
						var thuisKleedkamerDiv = document.createElement("div");
						thuisKleedkamerDiv.setAttribute('id', 'kleedkamer');
						thuisKleedkamerDiv.innerHTML = (kleedkamerthuisteam);
						
						//Create uitteamNameDiv
						var uitteamNameDiv = document.createElement("div");
						uitteamNameDiv.setAttribute('id', 'uitteam_wedstrijdinfo');
						uitteamNameDiv.innerHTML = (uitteam);

						//Create uitKledkamerDiv
						var uitKledkamerDiv = document.createElement("div");
						uitKledkamerDiv.setAttribute('id', 'kleedkamer');
						uitKledkamerDiv.innerHTML = (kleedkameruitteam)

						//Create wedstrijdVeldDiv
						var wedstrijdVeldDiv = document.createElement("div");
						wedstrijdVeldDiv.setAttribute('id', 'wedstrijdveld');
						wedstrijdVeldDiv.innerHTML = (veld);

						//Build the hole thing
						node.append(datumDiv, thuisteamDiv, thuisKleedkamerDiv, uitteamNameDiv, uitKledkamerDiv, wedstrijdVeldDiv);
						el.append(node);

					}
				}
			}

			if (emptyCheck != 'Wedstrijden' && emptyDayCheck == 'WedstrijdDag'){
				//Fetch the DIV
				var el = document.getElementById("rcorners_matchinfo")

				var noMatchProgram = document.createElement("div");
				noMatchProgram.setAttribute('id','topbar');
				noMatchProgram.innerHTML = ('<img src=\"images\\match_bg.png\"></img><br/><h1>Er is geen aankomende wedstrijd bekend de komende twee uur.</h1>');
				el.appendChild(noMatchProgram);
			}else if(emptyCheck != 'Wedstrijd' && emptyDayCheck != 'WedstrijdDag'){
				//Fetch the DIV
				var el = document.getElementById("rcorners_matchinfo")

				var noMatchProgram = document.createElement("div");
				noMatchProgram.setAttribute('id','topbar_image');
				noMatchProgram.innerHTML = ('<img src=\"images\\match_bg.png\"></img><br/><h1>Er zijn geen thuis wedstrijden bekend vandaag.</h1>');
				el.appendChild(noMatchProgram);
			}
			scrollListHeight = calulContent;
		}
	});
	document.cookie = "height="+scrollListHeight;
}

//Cleaned Function
function fetchMatchResults(){
	$('#rcorners_matchinfo').height($(window).height() - 25)
	$.ajax({
		url: sportlink_url+"uitslagen?gebruiklokaleteamgegevens=NEE&thuis=JA&uit=JA&" + sportlink_clientID,
		//url: "http://192.168.0.125/wvv_v2/test_feed_uitslag.html",
		async: false,
		dataType: 'json',
		success: function(uitslag) {

			var matchCounter=0;
			for (let i2 = 0; i2 < Object.keys(uitslag).length; i2++) {
				var thuisteam = uitslag[i2].thuisteam;
				var uitteam = uitslag[i2].uitteam;
				var uitslagmatch = uitslag[i2].uitslag;
				var matchdateresult = uitslag[i2].wedstrijddatum.split('T')[0];
				var datumopgemaakt = uitslag[i2].datumopgemaakt;
				var competitiesoort = uitslag[i2].competitiesoort;

				if(competitiesoort == 'regulier') {
					competitiesoort = 'Competitie'
				}

				if(competitiesoort == 'oefen') {
					competitiesoort = 'Oefenwedstrijd'
				}

				if(matchdateresult > pastMatchDate || matchdateresult == pastMatchDate){
					var emptyCheck = 'Uitslagen';
					matchCounter++;
					
					if (uitslag[i2].uitteamclubrelatiecode != '') {
						var uitlogo = "https://logoapi.voetbal.nl/logo.php?clubcode="+uitslag[i2].uitteamclubrelatiecode;
					} else {
						var uitlogo = "images/logo-knvb.png";
					}

					if (uitslag[i2].thuisteamclubrelatiecode != '') {
						var thuislogo = "https://logoapi.voetbal.nl/logo.php?clubcode="+uitslag[i2].thuisteamclubrelatiecode;
					} else {
						var thuislogo = "images/logo-knvb.png";
					}

					//Fetch the DIV
					var el = document.getElementById("rcorners_matchinfo")

					//Create placeholderDiv
					var node = document.createElement("div");
					node.setAttribute('id', 'placeholderDiv');
					
					//Create datumDiv
					var datumDiv = document.createElement("div");
					datumDiv.setAttribute('id', 'datumUitslag');
					datumDiv.innerHTML = (datumopgemaakt);
					
					//Create thuisclublogoDiv
					var thuisclublogoDiv = document.createElement("div");
					thuisclublogoDiv.setAttribute('id', 'thuisclublogo');
					thuisclublogoDiv.innerHTML = ('<img id=\'clublogoimage\' src='+thuislogo+'>');
					
					//Create thuisteamNameDiv
					var thuisteamDiv = document.createElement("div");
					thuisteamDiv.setAttribute('id', 'thuisteam');
					thuisteamDiv.innerHTML = (thuisteam);
					
					//Create wedstrijdUitslagDiv
					var wedstrijdUitslagDiv = document.createElement("div");
					wedstrijdUitslagDiv.setAttribute('id', 'wedstrijdUitslag');
					wedstrijdUitslagDiv.innerHTML = (uitslagmatch);
					
					//Create uitteamNameDiv
					var uitteamNameDiv = document.createElement("div");
					uitteamNameDiv.setAttribute('id', 'uitteam');
					uitteamNameDiv.innerHTML = (uitteam);

					//Create uitclublogoDiv
					var uitclublogoDiv = document.createElement("div");
					uitclublogoDiv.setAttribute('id', 'uitclublogoprogramma');
					uitclublogoDiv.innerHTML = ('<img id=\'clublogoimage\' src='+uitlogo+'>')

					//Create match soort
					var matchtypeDiv = document.createElement("div");
					matchtypeDiv.setAttribute('id', 'matchtype');
					matchtypeDiv.innerHTML = (competitiesoort);

					//Build the hole thing
					node.append(datumDiv, thuisclublogoDiv, thuisteamDiv, wedstrijdUitslagDiv, uitteamNameDiv, uitclublogoDiv, matchtypeDiv);
					el.append(node);
				}
			}

			if (emptyCheck != 'Uitslagen'){
				//Fetch the DIV
				var el = document.getElementById("rcorners_matchinfo")

				var noMatchResults = document.createElement("div");
				noMatchResults.setAttribute('id','topbar_image');
				noMatchResults.innerHTML = ('<img src=\"images\\match_bg.png\"></img><br/><h1>Er zijn geen laatste uitslagen bekend.</h1>');
				el.appendChild(noMatchResults);
			}
								
			var calulResult = matchCounter * 250;
			scrollListHeight = calulResult;
		}
  });
document.cookie = "height="+scrollListHeight;
}

//Cleaned Function
function fetchProgramma(){
	$('#rcorners_matchinfo').height($(window).height() - 25)
    $.ajax({
        url: sportlink_url+"programma?gebruiklokaleteamgegevens=NEE&aantaldagen=" + programma_dagen + "&eigenwedstrijden=JA&thuis=JA&uit=JA&" + sportlink_clientID,
		//url: "http://192.168.0.125/wvv_v2/test_feed_programma.html",
        async: false,
        dataType: 'json',
        success: function(programma) {

			for (let i = 0; i < Object.keys(programma).length; i++) {
				var emptyCheck = 'Programma';
				var aanvangstijd = programma[i].aanvangstijd;
				var thuisteam = programma[i].thuisteam;
				var uitteam = programma[i].uitteam;
				var accommodatie = programma[i].accommodatie;
				var competitiesoort = programma[i].competitiesoort;
				var datumNumber = programma[i].datum.substring(0,2);
				var datumMonth = programma[i].datum.slice(-4);
				var datumMonthClean = datumMonth.substring(0,3);
				var matchDate = programma[i].wedstrijddatum.split('+')[0];

				if(competitiesoort == 'regulier') {
					competitiesoort = 'Competitie'
				}

				if(competitiesoort == 'oefen') {
					competitiesoort = 'Oefenwedstrijd'
				}

				var amountGames = Object.keys(programma).length;
				var calulContent = amountGames * 65 + 500;

				if(matchDate == matchProgramTimeNow || matchDate > matchProgramTimeNow){
					
					if (programma[i].uitteamclubrelatiecode != '') {
						var uitlogo = "https://logoapi.voetbal.nl/logo.php?clubcode="+programma[i].uitteamclubrelatiecode;
					} else {
						var uitlogo = "images/logo-knvb.png";
					}

					if (programma[i].thuisteamclubrelatiecode != '') {
						var thuislogo = "https://logoapi.voetbal.nl/logo.php?clubcode="+programma[i].thuisteamclubrelatiecode;
					} else {
						var thuislogo = "images/logo-knvb.png";
					}
					
					//Fetch the DIV
					var el = document.getElementById("rcorners_matchinfo");
					
					//Create placeholderDiv
					var node = document.createElement("div");
					node.setAttribute('id', 'placeholderDiv');
					
					//Create datumDiv
					var datumDiv = document.createElement("div");
					datumDiv.setAttribute('id', 'datumProgramma');
					datumDiv.innerHTML = (datumNumber + " <span>" + datumMonthClean + "<br/>" + aanvangstijd + "</span>");
					
					//Create thuisclublogoDiv
					var thuisclublogoDiv = document.createElement("div");
					thuisclublogoDiv.setAttribute('id', 'thuisclublogo');
					thuisclublogoDiv.innerHTML = ('<img id=\'clublogoimage\' src='+thuislogo+'>');
					
					//Create thuisteamNameDiv
					var thuisteamDiv = document.createElement("div");
					thuisteamDiv.setAttribute('id', 'thuisteam');
					thuisteamDiv.innerHTML = (thuisteam);
					
					//Create scoreDeviderDiv
					var scoredeviderDiv = document.createElement("div");
					scoredeviderDiv.setAttribute('id', 'scoredevider');
					scoredeviderDiv.innerHTML = ('-');
					
					//Create uitteamNameDiv
					var uitteamNameDiv = document.createElement("div");
					uitteamNameDiv.setAttribute('id', 'uitteam');
					uitteamNameDiv.innerHTML = (uitteam);

					//Create uitclublogoDiv
					var uitclublogoDiv = document.createElement("div");
					uitclublogoDiv.setAttribute('id', 'uitclublogoprogramma');
					uitclublogoDiv.innerHTML = ('<img id=\'clublogoimage\' src='+uitlogo+'>')

					//Create match soort
					var matchtypeDiv = document.createElement("div");
					matchtypeDiv.setAttribute('id', 'matchtype');
					matchtypeDiv.innerHTML = (competitiesoort);

					//Build the hole thing
					node.append(datumDiv, thuisclublogoDiv, thuisteamDiv, scoredeviderDiv, uitteamNameDiv, uitclublogoDiv, matchtypeDiv);
					el.append(node);
				}
			}
			
			if (emptyCheck != 'Programma'){
				//Fetch the DIV
				var el = document.getElementById("rcorners_matchinfo")

				var noMatchProgram = document.createElement("div");
				noMatchProgram.setAttribute('id','topbar_image');
				noMatchProgram.innerHTML = ('<img src=\"images\\match_bg.png\"></img><br/><h1>Er zijn geen aankomende wedstrijden bekend.</h1>');
				el.appendChild(noMatchProgram);
			}
			
			scrollListHeight = calulContent;
		}
	});
	document.cookie = "height="+scrollListHeight;
}

