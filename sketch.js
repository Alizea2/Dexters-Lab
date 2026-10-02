/* Alizea Bakhtawar

My game project draws inspiration from Dexter's Lab, a beloved childhood cartoon, creating a virtual laboratory setting 
with various machines. The project incorporates extensions such as sound implementation, 
diverse enemy characters, and intricate platforms to enhance gameplay dynamics. 
One of the challenging aspect involved integrating platforms seamlessly into the jump code, 
requiring careful adjustments to the distance function between the protagonist, Dexter, and the enemies. 
Setting up constructor functions proved essential for organizing and initializing game elements efficiently, 
facilitating a modular and scalable code structure. Refactoring played a pivotal role in code maintenance, 
allowing me to revisit and optimize sections for better performance and readability. 
Refactoring the code was particularly valuable in streamlining the implementation of conditional statements using logical structures. 
Crafting these statements added complexity to the game's decision-making processes, enhancing the overall interactivity and challenge. 
One enjoyable aspect of the project was adding the sound extension, creating a more immersive and engaging gaming experience. 
This not only added an auditory dimension to the game but also provided an opportunity to explore the creative integration of 
multimedia elements. The game project not only brought back nostalgic memories but also provided a practical platform for developing 
and refining programming skills. The incorporation of extensions, overcoming coding challenges, 
and the utilization of constructor functions and logical statements collectively contributed to a holistic learning experience, 
fostering a deeper understanding of game development and programming principles.
 
References: 
Background Gradient: https://www.w3schools.com/graphics/canvas_gradients.asp
Sounds: 1.https://www.voicy.network/search/dexter-sound-effects 
        2. https://pixabay.com/sound-effects/search/life/
        3.https://www.101soundboards.com/search/dexter:%20bye

 */


    //Variable declarations

    // Dex (game character) variables
    var dex_x;
    var dex_y;

    var floor_x;
    var floor_y;

    // background scenery element variables
    var wwd;
    
    var gun;
    
    var table;
    
    var router;
    
    var mac1;
    
    var mac2;

    var skull;
    
    var mscreen;
    
    var mbody;
    
    var mantena;
    
    var poison;
    
    var canyon;
    
    var light;
    
    var flask;

    var cameraPosX;


    // dex movement variables
    var isLeft;
    var isRight;
    var isFalling;
    var isPlummeting;

    var flask_Counter;

    var battery;

    var danger_Zone;

    //sound variables
    var level_Compelete_Sound;
    var canyon_Sound;
    var flask_Sound;
    var theme_Sound;
    var jump_Sound;
    var game_Over_Sound;

    var platforms;

    var enemies;


    function preload()
    {
      soundFormats('mp3','wav');
        
    //Loading Sounds
        theme_Sound = loadSound('assets/dexters lab theme.mp3');
        theme_Sound.setVolume(0.1);
        
        level_Compelete_Sound = loadSound('assets/It Worked.mp3');
        level_Compelete_Sound.setVolume(1);
        
        canyon_Sound = loadSound('assets/Canyon_cartoon.mp3');
        canyon_Sound.setVolume(0.5);
        
        jump_Sound = loadSound('assets/jump_1.mp3');
        jump_Sound.setVolume(0.1);
         
        flask_Sound = loadSound('assets/glass1.mp3');
        flask_Sound.setVolume(0.5);
        
        game_Over_Sound = loadSound('assets/Glasses.mp3');
        game_Over_Sound.setVolume(0.1);
    }


    function setup()
    {
        createCanvas(1024, 576);
        
        //Theme Song
        theme_Sound.loop();

        //Variable initializations
        floor_y=height * 3/4;

        battery = 3;

        start_dexters_Lab();
        
    }

    function draw()
    {
         
    //Scrolling
     cameraPosX = dex_x - width/2;
         
     const Canvas = document.getElementById("defaultCanvas0");
     const ctx = canvas.getContext("2d");

    //Scenery 
    // Create gradient
     const grd = ctx.createLinearGradient(0, 0, 0, 500);
     grd.addColorStop(0, "grey");
     grd.addColorStop(1, "gold");
    // Fill with gradient
     ctx.fillStyle = grd;
     ctx.fillRect(0, 0, 1024, 576);
        noStroke();
        fill(0,155,0);


    // floor
      fill(70,130,180);
      rect(floor_x,floor_y-20,1024,25);  
      fill(176,196,222);
      rect(floor_x,floor_y+5,1024,25);
      fill(135,206,235);
      rect(floor_x,floor_y+25,1024,25);
      fill(92,92,92);
      rect(floor_x,floor_y+50,1024,100);
      
         
    //Scrolling
      push();
      translate(-cameraPosX,0);
         
         
    //Rendering Wall Wire Design
      drawWallWireDesign();

    //Rendering Laser Gun
      drawLaserGun();

    //Rendering table
      drawTable();
         
    //Rendering router
      drawRouter();

    //Rendering machine_1
      drawMachine_1();
         
    //Rendering machine_2
      drawMachine_2();
         
    //Rendering Skull
      drawSkull();
         
    // Monitor screen
      drawMonitorScreen();

    //Monitor body
      drawMonitorBody();

    //moniter antena
      drawMoniterAntena();

    //poison machine
      drawPoisonMachine();

    // Lights
      drawLights();
        
    //Platforms
      for(var i=0; i < platforms.length; i++) 
        {
            platforms[i].draw();
        }
          
    // Canyon
      for(var i=0; i<canyon.length; i++)
          {
            drawCanyon(canyon[i]);
          }  
        
    ////COLECTABLE FLASK INTERACTION////
      for(var i=0; i < flask.length; i++) 
        {     
            if(flask[i].isFound == false) 
            { 
            CollectableFlaskInteractivity(flask[i]);  
            CollectableFlask(flask[i]);
            }
        }

    ////ENEMY////
    for(var i=0; i < enemies.length; i++)
    {
        enemies[i].draw();

        var isContact = enemies[i].checkContact(dex_x,dex_y);

        if(isContact)
        {
        if(battery > 0)
        {
           battery -= 1;
           start_dexters_Lab();
           break;
        }
        }
    }

 
    ////CHARACTER RENDERING STARTS HERE:////
     smartyPants_Dexter();

    //Game End
     draw_danger_Zone();
    
    
     pop();
    
    //flask_Score_Counter
    drawScoreDisplay();
    fill(255);
    textSize(12);
    text("SCORE: " + flask_Counter, 80,70);

    check_dexter_die();

    //Battery_Lives
    for (var i = 0; i < battery; i++) {
            fill(199,197,197);
            rect(85+20*i,10,5,5);
            rect(82+20*i,46,12,5);
            fill(219,135,33);
            rect(80+20*i,12,16,15);
            fill(61,60,58);
            rect(80+20*i,24,16,25);
            fill(199,197,197);
            rect(80+20*i,27,16,3);
            fill(61,60,58);
            rect(87+20*i,15,2,6);
            rect(85+20 *i,17,6,2);
            fill(250,250,22);
            beginShape();
            vertex(88+20*i,31);
            vertex(81+20*i,39);
            vertex(86+20*i,39);
            vertex(84+20*i,46);
            vertex(91+20*i,37);
            vertex(85+20*i,37);
            vertex(88+20*i,31);
            endShape();
    }

    //Game End Interaction
    if(battery < 1 )
        {
            stroke(5);
            fill(255);
            textSize(50);
            text("GAME OVER!",360,280);`    `
            textSize(30);
            text("PRESS SPACE TO CONTINUE",300,305);
            game_Over_Sound.play();
            return;
        }

    //Level Complete Interaction
    if(danger_Zone.isReached == true)
        {
            stroke(3);
            fill(255);
            textSize(50);
            text("LEVEL COMPLETE!",290,280);
            textSize(30);
            text("PRESS SPACE TO CONTINUE",300,305);
            return;
        }

     
    ///////////INTERACTION CODE//////////
    if(isLeft == true && danger_Zone.isReached == false)
        {
            dex_x -=5;
        }

    if(isRight == true && danger_Zone.isReached == false)
        {
            dex_x +=5;
        }

    if(dex_y < floor_y && danger_Zone.isReached == false)
        {
            var isContact = false;
            for(var i = 0; i<platforms.length; i++)
                {
                    if(platforms[i].checkContact(dex_x, dex_y) == true)
                    {
                        isContact = true;
                        isPlummeting = false;
                        isFalling = false;
                        break;
                    }
                }
            if(isContact == false)
            {
            isFalling = true;
            dex_y += 7;
            isPlummeting = true;   
            }  
        }
            
    else 
        {
            isFalling = false;
            isPlummeting = false;
        } 


    //Canyon Interaction  
    for(var i=0; i<canyon.length; i++)
        {
        drawCanyon_Interativity(canyon[i]);
        }
       
    //Game End Interaction 
    if(danger_Zone.isReached == false) 
        {
        danger_Zone_Interativity();
        }

    }
   

    function keyPressed()
    {
        //restarting the game with space after game over or level complete
        if(keyCode == 32 && (battery < 1 || danger_Zone.isReached == true))
            {
            battery = 3;
            start_dexters_Lab();
            return;
            }

        if(keyCode == 39) 
            {
            isRight=true;
            }
        
        if(keyCode == 37)
            {
            isLeft=true;
            }   
        
        if(keyCode == 38 && isPlummeting == false)
            {
                jump_Sound.play();
                dex_y -= 250;
            }
    }

    function keyReleased()
    {
        if(keyCode == 39)
            {
            isRight=false;  
            }
        
        if(keyCode == 37)
            {
            isLeft=false;  
            }
            
    }


    // scenery element rendering starts here 
    function drawWallWireDesign ()
    {
        for(var i =0; i < wwd_x.length; i++)
        {
            noFill();
            stroke(41,41,41);
            strokeWeight(4);
            rect(wwd_x[i]-480,wwd.y-480,160,165);
            rect(wwd_x[i]-353,wwd.y-378,200,110);
            rect(wwd_x[i]-115,wwd.y-462,260,260);
            rect(wwd_x[i]+101,wwd.y-478,160,160);
            rect(wwd_x[i]-461,wwd.y-376,60,290);
            rect(wwd_x[i]-239,wwd.y-485,230,140);
            rect(wwd_x[i]+290,wwd.y-491,140,360);
            rect(wwd_x[i]+97,wwd.y-208,153,60);

            strokeWeight(4);     
            line(wwd_x[i]-320,wwd.y-455,wwd_x[i]-280,wwd.y-455);
            line(wwd_x[i]-290,wwd.y-380,wwd_x[i]-290,wwd.y-420);
            line(wwd_x[i]-250,wwd.y-380,wwd_x[i]-250,wwd.y-420);
            line(wwd_x[i]+220,wwd.y-380,wwd_x[i]+220,wwd.y-285);
            line(wwd_x[i]+220,wwd.y-270,wwd_x[i]+220,wwd.y-175);
            line(wwd_x[i]+220,wwd.y-380,wwd_x[i]+360,wwd.y-380);
            line(wwd_x[i]+220,wwd.y-285,wwd_x[i]+360,wwd.y-285);
            line(wwd_x[i]+220,wwd.y-270,wwd_x[i]+360,wwd.y-270);
            line(wwd_x[i]+220,wwd.y-175,wwd_x[i]+360,wwd.y-175);
            line(wwd_x[i]+360,wwd.y-380,wwd_x[i]+460,wwd.y-333);
            line(wwd_x[i]+360,wwd.y-285,wwd_x[i]+460,wwd.y-333);
            line(wwd_x[i]+360,wwd.y-270,wwd_x[i]+460,wwd.y-220);
            line(wwd_x[i]+360,wwd.y-175,wwd_x[i]+460,wwd.y-220);
            line(wwd_x[i]+460,wwd.y-333,wwd_x[i]+485,wwd.y-333);
            line(wwd_x[i]+460,wwd.y-220,wwd_x[i]+485,wwd.y-220);
            line(wwd_x[i]+160,wwd.y-270,wwd_x[i]+160,wwd.y-210);
            line(wwd_x[i]+195,wwd.y-270,wwd_x[i]+195,wwd.y-210);
            line(wwd_x[i]+430,wwd.y-465,wwd_x[i]+460,wwd.y-465);
            line(wwd_x[i]+430,wwd.y-445,wwd_x[i]+460,wwd.y-445);
            line(wwd_x[i]+430,wwd.y-425,wwd_x[i]+460,wwd.y-425);
            line(wwd_x[i]-250,wwd.y-267,wwd_x[i]-250,wwd.y-247);
            line(wwd_x[i]-230,wwd.y-267,wwd_x[i]-230,wwd.y-247);
            line(wwd_x[i]-210,wwd.y-267,wwd_x[i]-210,wwd.y-247);
            line(wwd_x[i]-190,wwd.y-267,wwd_x[i]-190,wwd.y-247);
            line(wwd_x[i]+133,wwd.y-148,wwd_x[i]+153,wwd.y-120);
            line(wwd_x[i]+153,wwd.y-120,wwd_x[i]+260,wwd.y-120);
            line(wwd_x[i]+165,wwd.y-147,wwd_x[i]+165,wwd.y-135);
            line(wwd_x[i]+185,wwd.y-147,wwd_x[i]+185,wwd.y-135);
            line(wwd_x[i]+205,wwd.y-147,wwd_x[i]+205,wwd.y-135);

            stroke(255);
            ellipse(wwd_x[i]-443,wwd.y-356,15,15);
            ellipse(wwd_x[i]-418,wwd.y-356,15,15);
            ellipse(wwd_x[i]-443,wwd.y-330,15,15);
            ellipse(wwd_x[i]-418,wwd.y-330,15,15);
            ellipse(wwd_x[i]-336,wwd.y-362,15,15);
            ellipse(wwd_x[i]-336,wwd.y-335,15,15);
            ellipse(wwd_x[i]-221,wwd.y-362,15,15);
            ellipse(wwd_x[i]-193,wwd.y-362,15,15);
            ellipse(wwd_x[i]+123,wwd.y-442,15,15);
            ellipse(wwd_x[i]+235,wwd.y-192,15,15);
            ellipse(wwd_x[i]+240,wwd.y-363,15,15);
            ellipse(wwd_x[i]+240,wwd.y-338,15,15);

            fill(12,12,12);
            strokeWeight(0);     
            ellipse(wwd_x[i]-250,wwd.y-240,15,15);
            ellipse(wwd_x[i]-230,wwd.y-240,15,15);
            ellipse(wwd_x[i]-210,wwd.y-240,15,15);
            ellipse(wwd_x[i]-190,wwd.y-240,15,15);
            ellipse(wwd_x[i]+165,wwd.y-132,15,15);
            ellipse(wwd_x[i]+185,wwd.y-132,15,15);
            ellipse(wwd_x[i]+205,wwd.y-132,15,15);
            ellipse(wwd_x[i]-280,wwd.y-455,15,15);
            ellipse(wwd_x[i]-290,wwd.y-420,15,15);
            ellipse(wwd_x[i]-250,wwd.y-420,15,15);
            ellipse(wwd_x[i]+485,wwd.y-220,15,15);
            ellipse(wwd_x[i]+485,wwd.y-333,15,15);
            ellipse(wwd_x[i]+160,wwd.y-270,15,15);
            ellipse(wwd_x[i]+195,wwd.y-270,15,15);
            ellipse(wwd_x[i]+460,wwd.y-465,15,15);
            ellipse(wwd_x[i]+460,wwd.y-445,15,15);
            ellipse(wwd_x[i]+460,wwd.y-425,15,15);
            ellipse(wwd_x[i]+260,wwd.y-120,15,15);  
        }
    }

    function drawLaserGun()
    {
        for(var i =0; i < gun_x.length; i++)
        {    
            noStroke();
            fill(95,158,160);
            rect(gun_x[i]-180,gun.y+210,100,19);
            rect(gun_x[i]-180,gun.y+210,100,19);
            fill(70,70,70);
            rect(gun_x[i]-170,gun.y+30,60,180);
            fill(80,80,80);
            triangle(gun_x[i]-140,gun.y+50,gun_x[i]+5,gun.y+50,gun_x[i]-110,gun.y-5);
            fill(80,80,80);
            rect(gun_x[i]-163,gun.y+40,45,160);
            fill(186, 22, 71);
            ellipse(gun_x[i]-140,gun.y+90,25,25);
            fill(80,80,80);
            rect(gun_x[i]-117,gun.y-10,130,60);
            fill(80,80,80);
            rect(gun_x[i]+12,gun.y+10,70,15);
            fill(163,165,168);
            rect(gun_x[i]+82,gun.y+13,50,8);
            fill(36, 137, 166);
            ellipse(gun_x[i]+147,gun.y+18,30,30);
            fill(255);
            ellipse(gun_x[i]+147,gun.y+10,10,5);
        }
    }

    function drawTable()
    {
        for(var i =0; i < table_x.length; i++)
        {   
            fill(0,130,130);
            rect(table_x[i],table.y+9,250,90);
            fill(174,55,255);
            rect(table_x[i]+30,table.y+9,190,30);
        }
    } 

    function drawRouter()
    {
        for(var i =0; i < router_x.length; i++)
        {   
            fill(0,0,0);
            rect(router_x[i]-5,router.y+5,40,10);
            rect(router_x[i],router.y-20,3,35);
            rect(router_x[i]+27,router.y-20,3,35);
            fill(0,255,0);
            ellipse(router_x[i]+30,router.y+10,7,7);
            ellipse(router_x[i]+20,router.y+10,7,7);
            ellipse(router_x[i]+10,router.y+10,7,7);
            ellipse(router_x[i],router.y+10,7,7);
        }
    }
           
    function drawMachine_1()
    {
        for(var i =0; i < mac1_x.length; i++)
        {    
            fill(0,0,0);
            rect(mac1_x[i]+10,mac1.y,3,35);
            fill(46,80,144);  
            rect(mac1_x[i],mac1.y+15,20,25);
            fill(148, 6, 18);
            ellipse(mac1_x[i]+11,mac1.y,10,10);
            fill(0,255,0);
            triangle(mac1_x[i]+5,mac1.y+30,mac1_x[i]+15,mac1.y+30,mac1_x[i]+10,mac1.y+20);
        }
    }
           
    function drawMachine_2()
    {
        for(var i =0; i < mac2_x.length; i++)
        {   
            fill(0,0,0);
            rect(mac2_x[i]+27,mac2.y+13,3,35);
            fill(128,0,128);
            rect(mac2_x[i]-30,mac2.y+45,60,60);
            fill(85,206,255);
            rect(mac2_x[i]-23,mac2.y+52,45,45);
            fill(59, 22, 242);
            ellipse(mac2_x[i]+28,mac2.y+13,10,10);
        }
    }
           
    function drawSkull()
    {
        for(var i =0; i < skull_x.length; i++)
        {    
            fill(255);
            ellipse(skull_x[i]-1,skull.y+22,30,35);
            rect(skull_x[i]-11,skull.y+34,20,10);
            fill(0);  
            ellipse(skull_x[i]-8,skull.y+19,10,9);
            ellipse(skull_x[i]+6,skull.y+19,10,9);
            ellipse(skull_x[i]-3,skull.y+30,4,4);
            ellipse(skull_x[i]+1,skull.y+30,4,4);
            ellipse(skull_x[i]-1,skull.y+28,4,4);
            rect(skull_x[i]-9,skull.y+36,16,6);  
        }
    } 

    function drawMonitorScreen(){
        for(var i =0; i < mscreen_x.length; i++)
        {   
            fill(13, 57, 89);
            rect(mscreen_x[i]-40,mscreen.y-180,260,260);  
            fill(85,206,255);
            rect(mscreen_x[i]-25,mscreen.y-165,230,230);
            fill(0);
            rect(mscreen_x[i]+23,mscreen.y-20,125,15);
            fill(255);
            rect(mscreen_x[i]+28,mscreen.y-18,117,10);
            fill(250,0,0);
            ellipse(mscreen_x[i]+210,mscreen.y+72,10,10);
            fill(0);
            ellipse(mscreen_x[i]+210,mscreen.y+72,5,5);
            ellipse(mscreen_x[i]+90,mscreen.y-60,50,50);
            fill(255);
            ellipse(mscreen_x[i]+90,mscreen.y-60,45,45);
            fill(0);
            strokeWeight(6);
            textSize(12);
            text("DEXTER'S LAB",mscreen_x[i]+40,mscreen.y-8);
        }
    }

    function drawMonitorBody()
    {
        for(var i =0; i < mbody_x.length; i++)
        {      
            fill(70,70,70); 
            rect(mbody_x[i]+60,mbody.y-20,30,30);
            fill(13, 57, 89);
            rect(mbody_x[i]+30,mbody.y,90,15);
            fill(32,125,57);
            fill(119,136,170);
            rect(mbody_x[i]-10,mbody.y+15,170,64);
        }
    }

    function drawMoniterAntena()
    {
        for(var i =0; i < mantena_x.length; i++)
        {      
            fill(255,102,0);
            triangle(mantena_x[i]-40,mantena.y-10,mantena_x[i]+60,mantena.y-10,mantena_x[i]+20,mantena.y+20);
            fill(0);
            rect(mantena_x[i]+20,mantena.y-25,3,15);
            fill(255,0,0);
            ellipse(mantena_x[i]+22,mantena.y-25,8,8);
        }
    }

    function drawPoisonMachine()
    {
        for(var i =0; i < poison_x.length; i++)
        {
            fill(0,153,155);
            triangle(poison_x[i]-60,poison.y+129,poison_x[i]+200,poison.y+129,poison_x[i]+70,poison.y-50);
            rect(poison_x[i]+20,poison.y-300,100,320);
            fill(255,102,0);
            rect(poison_x[i]+30,poison.y-300,10,320);
            rect(poison_x[i]+100,poison.y-300,10,320);
            fill(140,204,76);
            ellipse(poison_x[i]+70,poison.y-260,40,50);
            ellipse(poison_x[i]+70,poison.y-200,40,50);
            ellipse(poison_x[i]+70,poison.y-140,40,50);
            ellipse(poison_x[i]+70,poison.y-80,40,50);
            ellipse(poison_x[i]+70,poison.y-20,40,50);
            ellipse(poison_x[i]+70,poison.y+75,40,90);
            ellipse(poison_x[i]+25,poison.y+75,40,90);
            ellipse(poison_x[i]+115,poison.y+75,40,90);
        }
    }
    
    function drawLights()
    {
        for(var i =0; i < light_x.length; i++)
        {
            fill(0);
            rect(light_x[i]-140,light.y-100,5,120);
            rect(light_x[i]-10,light.y-100,5,120);
            rect(light_x[i]+120,light.y-100,5,120);
            fill(255,255,0);
            ellipse(light_x[i]-137,light.y+30,30,30);
            ellipse(light_x[i]-7,light.y+30,30,30);
            ellipse(light_x[i]+123,light.y+30,30,30);
            fill(0);
            triangle(light_x[i]-167,light.y+30,light_x[i]-100,light.y+30,light_x[i]-137,light.y);
            triangle(light_x[i]-37,light.y+30,light_x[i]+30,light.y+30,light_x[i]-7,light.y);
            triangle(light_x[i]+93,light.y+30,light_x[i]+160,light.y+30,light_x[i]+123,light.y);
        }
    }

    function drawCanyon(T_canyon)
    {
            fill(40,103,200);  
            rect(T_canyon.x-15,T_canyon.y-20,125,65);
            fill(0,206, 209);  
            rect(T_canyon.x+7,T_canyon.y-5,81,200);  
            fill(255,0,0);
            ellipse(T_canyon.x-4,T_canyon.y-7,18,18);
            ellipse(T_canyon.x+99,T_canyon.y-7,18,18);
            fill(255,255,0);
            ellipse(T_canyon.x-4,T_canyon.y+12,18,18);
            ellipse(T_canyon.x+99,T_canyon.y+12,18,18);
            fill(0,255,0);
            ellipse(T_canyon.x-4,T_canyon.y+31,18,18);
            ellipse(T_canyon.x+99,T_canyon.y+31,18,18);   
    }

   function drawCanyon_Interativity(T_canyon)
   {
        if((dex_x > T_canyon.x && dex_x < T_canyon.x + T_canyon.width + 15) && dex_y >= floor_y)
        {
            dex_y += 100;
            isLeft = false;
            isRight = false;
            canyon_Sound.play();
        }
   }

   function CollectableFlask(T_flask)
   {
       if(T_flask.isFound == false)
        { 
            fill(0);
            triangle(T_flask.x,T_flask.y+72,T_flask.x+16,T_flask.y+72,T_flask.x+8,T_flask.y+80);
            triangle(T_flask.x+8,T_flask.y+80,T_flask.x-7,T_flask.y+95,T_flask.x+23,T_flask.y+95);
            rect(T_flask.x+5,T_flask.y+75,6,10);
            fill(173,216,230);
            triangle(T_flask.x+2,T_flask.y+73,T_flask.x+14,T_flask.y+73,T_flask.x+8,T_flask.y+78);
            triangle(T_flask.x+8,T_flask.y+82,T_flask.x-5,T_flask.y+94,T_flask.x+21,T_flask.y+94);
            rect(T_flask.x+6,T_flask.y+75,4,10);
            fill(0,0,255);
            beginShape();
            vertex(T_flask.x+6,T_flask.y+85);
            vertex(T_flask.x-3,T_flask.y+93);
            vertex(T_flask.x+19,T_flask.y+93);
            vertex(T_flask.x+12,T_flask.y+87);
            endShape();
            ellipse(T_flask.x+9,T_flask.y+85,T_flask.size,T_flask.size);
            ellipse(T_flask.x+8,T_flask.y+83,T_flask.size,T_flask.size);
        }
   }

   function CollectableFlaskInteractivity(T_flask)
   {
        if(dist(dex_x, dex_y, T_flask.x + 19, T_flask.y + 70) < 80)
        {
            T_flask.isFound = true;
            flask_Counter +=1;
            flask_Sound.play();
        }
   }

   function smartyPants_Dexter()  // Dex movemenet 
   {
        if(isLeft && isFalling)
        {
                // jumping-left code
                // Lab Coat
            noStroke();
            fill(238,233,233);
            rect(dex_x-14,dex_y-39,38,25);
            triangle(dex_x-19,dex_y-14,dex_x-14,dex_y-37,dex_x-14,dex_y-14);
            fill(0);
            rect(dex_x+11,dex_y-39,1,25);
            ellipse(dex_x+8,dex_y-23,4,7);

            // Face Shape
            noStroke();
            fill(245,214,196);
            rect(dex_x-14,dex_y-74,38,35);
            ellipse(dex_x,dex_y-54,38,40);
            triangle(dex_x-14,dex_y-41,dex_x,dex_y-31,dex_x+24,dex_y-39);
            ellipse(dex_x+25,dex_y-55,7,7);

            // Hair Strokes
            fill(0);
            triangle(dex_x+22,dex_y-71,dex_x+22,dex_y-72,dex_x+30,dex_y-80);
            triangle(dex_x+22,dex_y-71,dex_x+22,dex_y-72,dex_x+32,dex_y-78);
            triangle(dex_x+24,dex_y-71,dex_x+24,dex_y-72,dex_x+31,dex_y-70);

            // Hair
            noStroke();
            fill(255, 122, 66);
            ellipse(dex_x+3,dex_y-71,45,11);
            ellipse(dex_x+9,dex_y-68,15,14);
            ellipse(dex_x-4,dex_y-68,15,14);
            ellipse(dex_x-15,dex_y-68,11,11);

            // Eyes
            fill(0);
            rect(dex_x-22,dex_y-61,46,2);
            arc(dex_x-12,dex_y-59,21,22,0,PI);
            arc(dex_x+8,dex_y-59,21,22,0,PI);
            fill(132,188,213);
            arc(dex_x-12,dex_y-59,18,19,0,PI);
            arc(dex_x+8,dex_y-59,18,19,0,PI);
            fill(0);
            arc(dex_x-12,dex_y-59,7,7,0,PI);
            arc(dex_x+8,dex_y-59,7,7,0,PI);

            // Mouth
            fill(245,214,196);
            triangle(dex_x,dex_y-50,dex_x+1,dex_y-47,dex_x-10,dex_y-51);
            stroke(0);
            strokeWeight(2);
            line(dex_x+1,dex_y-51,dex_x-10,dex_y-51);
            line(dex_x-10,dex_y-51,dex_x-2,dex_y-47);
            line(dex_x-2,dex_y-47,dex_x-2,dex_y-42);

            // Smile
            noFill();
            beginShape();
            curveVertex(dex_x-2,dex_y-43);
            curveVertex(dex_x-2,dex_y-42);
            curveVertex(dex_x-1,dex_y-41);
            curveVertex(dex_x,dex_y-40);
            curveVertex(dex_x+1,dex_y-40);
            curveVertex(dex_x+3,dex_y-41);
            curveVertex(dex_x+4,dex_y-42);
            curveVertex(dex_x+5,dex_y-42);
            endShape();

            // Right Arm
            noStroke();
            fill(238, 233, 233);
            beginShape();
            vertex(dex_x-13,dex_y-39);
            vertex(dex_x-22,dex_y-44);
            vertex(dex_x-26,dex_y-32);
            vertex(dex_x-21,dex_y-30);
            vertex(dex_x-20,dex_y-36);
            vertex(dex_x-15,dex_y-33);
            endShape();

            // Left Arm
            beginShape();
            vertex(dex_x+22,dex_y-38);
            vertex(dex_x+32,dex_y-44);
            vertex(dex_x+36,dex_y-33);
            vertex(dex_x+32,dex_y-31);
            vertex(dex_x+30,dex_y-36);
            vertex(dex_x+22,dex_y-31);
            endShape();

            // Hands
            fill(173,90,255);
            triangle(dex_x-29,dex_y-34,dex_x-18,dex_y-31,dex_x-28,dex_y-28);
            triangle(dex_x+26,dex_y-31,dex_x+37,dex_y-35,dex_x+34,dex_y-29);
            ellipse(dex_x-26,dex_y-28,8,5);
            ellipse(dex_x+33,dex_y-28,8,5);
            ellipse(dex_x-23,dex_y-25,3,7);
            ellipse(dex_x-26,dex_y-25,3,7);
            ellipse(dex_x-29,dex_y-25,3,7);
            ellipse(dex_x+36,dex_y-25,3,7);
            ellipse(dex_x+33,dex_y-25,3,7);
            ellipse(dex_x+30,dex_y-25,3,7);

            fill(0);
            beginShape();
            vertex(dex_x-15,dex_y -15);
            vertex(dex_x-16,dex_y-8);
            vertex(dex_x-27,dex_y);
            vertex(dex_x-14,dex_y+1);
            vertex(dex_x-11,dex_y-3);
            vertex(dex_x-11,dex_y+1);
            vertex(dex_x-6,dex_y+1);
            vertex(dex_x-4,dex_y-15);
            endShape();
            ellipse(dex_x+15,dex_y-23,10,10);
            beginShape();
            vertex(dex_x+10,dex_y-22);
            vertex(dex_x+12,dex_y-13);
            vertex(dex_x+5,dex_y-5);
            vertex(dex_x+18,dex_y-7);
            vertex(dex_x+19,dex_y-12);
            vertex(dex_x+21,dex_y-8);
            vertex(dex_x+25,dex_y-8);
            vertex(dex_x+25,dex_y-25);
            vertex(dex_x+16,dex_y-28);
            endShape();

        }
        else if(isRight && isFalling)
        {
                // jumping-right code
                    //Lab Coat
            noStroke();
            fill(238,233,233);
            rect(dex_x-24,dex_y-39,39,25);
            triangle(dex_x+15,dex_y-39,dex_x+15,dex_y-15,dex_x+19,dex_y-15);
            fill(0);
            rect(dex_x-9,dex_y-39,1,25);
            ellipse(dex_x-4,dex_y-24,4,7);
            
            //Face Shape
            noStroke();
            fill(245,214,196);
            rect(dex_x-24,dex_y-74,39,35);
            ellipse(dex_x+1,dex_y-53,39,40);
            triangle(dex_x-24,dex_y-41,dex_x+4,dex_y-32,dex_x+14,dex_y-38);
            ellipse(dex_x-26,dex_y-57,7,7);
            
            //Right Arm
            fill(238,233,233);
            beginShape();
            vertex(dex_x-23,dex_y-37);
            vertex(dex_x-30,dex_y-42);
            vertex(dex_x-34,dex_y-30);
            vertex(dex_x-29,dex_y-28);
            vertex(dex_x-28,dex_y-35);
            vertex(dex_x-25,dex_y-31);
            endShape();
            
            //Left Arm
            beginShape();
            vertex(dex_x+14,dex_y-38);
            vertex(dex_x+25,dex_y-44);
            vertex(dex_x+28,dex_y-33);
            vertex(dex_x+24,dex_y-31);
            vertex(dex_x+22,dex_y-36);
            vertex(dex_x+14,dex_y-31);
            endShape();
            
            //Hands
            fill(173,90,255);
            triangle(dex_x-37,dex_y-34,dex_x-24,dex_y-31,dex_x-34,dex_y-28);
            triangle(dex_x+19,dex_y-31,dex_x+31,dex_y-34,dex_x+26,dex_y-28);
            ellipse(dex_x-32,dex_y-29,8,5);
            ellipse(dex_x+26,dex_y-29,8,5);
            ellipse(dex_x-29,dex_y-26,3,7);
            ellipse(dex_x-32,dex_y-26,3,7);
            ellipse(dex_x-35,dex_y-26,3,7);
            ellipse(dex_x+23,dex_y-26,3,7);
            ellipse(dex_x+26,dex_y-26,3,7);
            ellipse(dex_x+29,dex_y-26,3,7);
            
            //Hair Strokes
            fill(0);
            triangle(dex_x-32,dex_y-85,dex_x-23,dex_y-73,dex_x-23,dex_y-74);
            triangle(dex_x-31,dex_y-80,dex_x-23,dex_y-73,dex_x-23,dex_y-74);
            triangle(dex_x-31,dex_y-74,dex_x-23,dex_y-73,dex_x-23,dex_y-74);
            
            //Hair
            noStroke();
            fill(255,122,66);
            ellipse(dex_x-3,dex_y-73,46,11);
            ellipse(dex_x-9,dex_y-70,15,14);
            ellipse(dex_x+4,dex_y-70,15,14);
            ellipse(dex_x+16,dex_y-70,11,11);
            
            //Eyes
            fill(0);
            rect(dex_x-24,dex_y-62,47,2);
            arc(dex_x-7,dex_y-60,21,21,0,PI);
            arc(dex_x+13,dex_y-60,21,21,0,PI);
            fill(132,188,213);
            arc(dex_x-7,dex_y-60,18,18,0,PI);
            arc(dex_x+13,dex_y-60,18,18,0,PI);
            fill(0);
            arc(dex_x-7,dex_y-60,7,7,0,PI);
            arc(dex_x+13,dex_y-60,7,7,0,PI);
            
            //Mouth
            fill(245,214,196);
            triangle(dex_x+7,dex_y-52,dex_x+9,dex_y-50,dex_x+13,dex_y-52);
            stroke(0,0,0);
            strokeWeight(2);
            line(dex_x+1,dex_y-52,dex_x+13,dex_y-52);
            line(dex_x+13,dex_y-52,dex_x+6,dex_y-48);
            line(dex_x+6,dex_y-48,dex_x+6,dex_y-44);
            
            //smile
            noFill();
            beginShape();
            curveVertex(dex_x+6,dex_y-47);
            curveVertex(dex_x+6,dex_y-44);
            curveVertex(dex_x+4,dex_y-43);
            curveVertex(dex_x+3,dex_y-43);
            curveVertex(dex_x+2,dex_y-43);
            curveVertex(dex_x+1,dex_y-45);
            curveVertex(dex_x,dex_y-47);
            endShape();
            
            //SHOES
            fill(0);
            rect(dex_x-24,dex_y-23,5,15);
            ellipse(dex_x-16,dex_y-20,13,10);
            line(dex_x-24,dex_y-23,dex_x-17,dex_y-25);
            triangle(dex_x-15,dex_y-9,dex_x-3,dex_y-13,dex_x-17,dex_y-19);
            beginShape();
            vertex(dex_x+3,dex_y-14);
            vertex(dex_x+8,dex_y+2);
            vertex(dex_x+13,dex_y+1);
            vertex(dex_x+13,dex_y-3);
            vertex(dex_x+17,dex_y-1);
            vertex(dex_x+26,dex_y-4);
            vertex(dex_x+15,dex_y-9);
            vertex(dex_x+13,dex_y-14);
            vertex(dex_x+3,dex_y-14);
            endShape();

        }
        else if(isLeft)
        {
                // walking left code
                // Shoes
            fill(0);
            triangle(dex_x-17,dex_y+2,dex_x-10,dex_y-12,dex_x+10,dex_y-12);
            triangle(dex_x+17,dex_y+2,dex_x+10,dex_y-12,dex_x-5,dex_y-12);
            triangle(dex_x-7,dex_y+1,dex_x-2,dex_y-12,dex_x+10,dex_y-12);
            triangle(dex_x+6,dex_y+1,dex_x+2,dex_y-12,dex_x-10,dex_y-12);

            // Lab Coat
            noStroke();
            fill(238, 233, 233);
            rect(dex_x-17,dex_y-36, 38, 24);
            triangle(dex_x-22,dex_y-12,dex_x-17,dex_y-37,dex_x-17,dex_y-12);
            fill(0);
            rect(dex_x+4,dex_y-36, 1, 24);
            ellipse(dex_x+1,dex_y-22, 3, 7);

            // Face Shape
            noStroke();
            fill(245, 214, 196);
            rect(dex_x-17,dex_y-70, 38, 35);
            ellipse(dex_x-3,dex_y-49, 38, 39);
            triangle(dex_x-17,dex_y-36,dex_x-2,dex_y-27,dex_x+21,dex_y-37);
            ellipse(dex_x+23,dex_y-51, 7, 7);

            // Hair Strokes
            fill(0);
            triangle(dex_x+20,dex_y-71,dex_x+20,dex_y-70,dex_x+29,dex_y-78);
            triangle(dex_x+20,dex_y-71,dex_x+20,dex_y-70,dex_x+31,dex_y-77);
            triangle(dex_x+11,dex_y-71,dex_x+20,dex_y-70,dex_x+31,dex_y-72);

            // Hair
            noStroke();
            fill(255, 122, 66);
            ellipse(dex_x+1,dex_y-70,45,10);
            ellipse(dex_x+8,dex_y-67,15,14);
            ellipse(dex_x-6,dex_y-67,15,14);
            ellipse(dex_x-18,dex_y-67,10,10);

            // Hand
            fill(0);
            rect(dex_x+12,dex_y-28, 1, 4);
            fill(173, 90, 255);
            triangle(dex_x+12,dex_y-24,dex_x+22,dex_y-24,dex_x+12,dex_y-20);
            ellipse(dex_x+16,dex_y-21,7,4);
            ellipse(dex_x+13,dex_y-19,2,7);
            ellipse(dex_x+15,dex_y-19,2,7);
            ellipse(dex_x+17,dex_y-19,2,7);

            // Eyes
            fill(0);
            rect(dex_x-25,dex_y-56,46, 2);
            arc(dex_x-15,dex_y-54,21,21,0,PI);
            arc(dex_x+6,dex_y-54,21,21,0,PI);
            fill(132,188,213);
            arc(dex_x-15,dex_y-54,17,18,0,PI);
            arc(dex_x+6,dex_y-54,17,18,0,PI);
            fill(0);
            arc(dex_x-15,dex_y-54,7,7,0,PI);
            arc(dex_x+6,dex_y-54,7,7,0,PI);

            // Mouth
            fill(245, 214, 196);
            triangle(dex_x-5,dex_y-46,dex_x-4,dex_y-42,dex_x-12, dex_y-46);
            stroke(0,0,0);
            strokeWeight(2);
            line(dex_x,dex_y-46,dex_x-12,dex_y-46);
            line(dex_x-12,dex_y-46,dex_x-5,dex_y-41);
            line(dex_x-5,dex_y-41,dex_x-5,dex_y-36);
        
            // Smile
            noFill();
            beginShape();
            curveVertex(dex_x-6,dex_y-35);
            curveVertex(dex_x-6,dex_y-36);
            curveVertex(dex_x-4,dex_y-35);
            curveVertex(dex_x-4,dex_y-35);
            curveVertex(dex_x-2,dex_y-35);
            curveVertex(dex_x,dex_y-37);
            curveVertex(dex_x-2,dex_y-37);
            endShape();

        }
        else if(isRight)
        {
                // walking right code
                //Shoes
            fill(0);
            triangle(dex_x-21,dex_y+2,dex_x-14,dex_y-13,dex_x+7,dex_y-13);
            triangle(dex_x+13,dex_y+2,dex_x+6,dex_y-13,dex_x-19,dex_y-13);
            triangle(dex_x-11,dex_y,dex_x-7,dex_y-13,dex_x+6,dex_y-13);
            triangle(dex_x+2,dex_y,dex_x-1,dex_y-13,dex_x-14,dex_y-13);
            
            //Lab Coat
            noStroke();
            fill(238,233,233);
            rect(dex_x-24,dex_y-35,39,24);
            triangle(dex_x+15,dex_y-36,dex_x+15,dex_y-11,dex_x+21,dex_y-11);
            fill(0);
            rect(dex_x-9,dex_y-35,1,24);
            ellipse(dex_x-5,dex_y-21,3,7);
            
            //Face Shape
            noStroke();
            fill(245,214,196);
            rect(dex_x-24,dex_y-70,39,35);
            ellipse(dex_x+1,dex_y-49,39,40);
            triangle(dex_x-24,dex_y-35,dex_x+3,dex_y-27,dex_x+19,dex_y-39);
            ellipse(dex_x-26,dex_y-53,7,7);
            
            //Hair Strokes
            fill(0);
            triangle(dex_x-32,dex_y-79,dex_x-24,dex_y-69,dex_x-24,dex_y-70);
            triangle(dex_x-36,dex_y-72,dex_x-24,dex_y-70,dex_x-24,dex_y-71);
            triangle(dex_x-33,dex_y-76,dex_x-24,dex_y-69,dex_x-24,dex_y-70);
            
            //Hair
            noStroke();
            fill(255,122,66);
            ellipse(dex_x-3,dex_y-70,46,11);
            ellipse(dex_x-9,dex_y-68,15,14);
            ellipse(dex_x+4,dex_y-68,15,14);
            ellipse(dex_x+16,dex_y-67,11,11);
            
            //Hand
            fill(0);
            rect(dex_x-18,dex_y-26,1,4);
            fill(173,90,255);
            triangle(dex_x-28,dex_y-23,dex_x-17,dex_y-23,dex_x-17,dex_y-19);
            ellipse(dex_x-21,dex_y-19,8,5);
            ellipse(dex_x-18,dex_y-17,3,7);
            ellipse(dex_x-21,dex_y-17,3,7);
            ellipse(dex_x-24,dex_y-17,3,7);
            
            //Eyes
            fill(0);
            rect(dex_x-24,dex_y-58,47,2);
            arc(dex_x-7,dex_y-57,22,23,0,PI);
            arc(dex_x+13,dex_y-57,22,23,0,PI);
            fill(132, 188, 213);
            arc(dex_x-7,dex_y-56,18,18,0,PI);
            arc(dex_x+13,dex_y-56,18,18,0,PI);
            fill(0);
            arc(dex_x-7,dex_y-56,7,7,0,PI);
            arc(dex_x+13,dex_y-56,7,7,0,PI);
            
            //Mouth
            noStroke();
            fill(245,214,196);
            triangle(dex_x+5,dex_y-48,dex_x+7,dex_y-45,dex_x+12,dex_y-48);
            stroke(0,0,0);
            fill(0);
            strokeWeight(2);
            line(dex_x,dex_y-49,dex_x+15,dex_y-49);
            line(dex_x+15,dex_y-49,dex_x+7,dex_y-44);
            line(dex_x+7,dex_y-44,dex_x+7,dex_y-40);
            
            //smile
            noFill();
            beginShape();
            curveVertex(dex_x+7,dex_y-40);
            curveVertex(dex_x+7,dex_y-39);
            curveVertex(dex_x+7,dex_y-39);
            curveVertex(dex_x+5,dex_y-38);
            curveVertex(dex_x+4,dex_y-38);
            curveVertex(dex_x+2,dex_y-39);
            curveVertex(dex_x+2,dex_y-40);
            endShape();

        }
        else if(isFalling || isPlummeting)
        {
                // jumping facing forwards code
                //Legs
            fill(0)
            beginShape();
            vertex(dex_x-16,dex_y-8);
            vertex(dex_x,dex_y-37);
            vertex(dex_x+14,dex_y-8);
            vertex(dex_x+6,dex_y-7);
            vertex(dex_x,dex_y-33);
            vertex(dex_x-8,dex_y-7);
            endShape();

            //Shoes
            rect(dex_x-12,dex_y-8,3,8);
            rect(dex_x+7,dex_y-8,3,8);
            rect(dex_x-15,dex_y-8,6,4);
            rect(dex_x+7,dex_y-8,6,4);
            triangle(dex_x-15,dex_y-8,dex_x-11,dex_y-3,dex_x-24,dex_y+2);
            triangle(dex_x+12,dex_y-8,dex_x+8,dex_y-3,dex_x+22,dex_y+2);

            // Lab Coat
            fill(238,233,233);
            rect(dex_x-20,dex_y-41,38,28);
            fill(0);
            rect(dex_x-9,dex_y-41,1,28);
            ellipse(dex_x-5,dex_y-24,4,7);
            fill(238,233,233);
            beginShape();
            vertex(dex_x-20,dex_y-38);
            vertex(dex_x-26,dex_y-42);
            vertex(dex_x-32,dex_y-36);
            vertex(dex_x-28,dex_y-33);
            vertex(dex_x-25,dex_y-36);
            vertex(dex_x-20,dex_y-33);
            endShape();
            beginShape();
            vertex(dex_x+16,dex_y-38);
            vertex(dex_x+24,dex_y-42);
            vertex(dex_x+29,dex_y-36);
            vertex(dex_x+25,dex_y-33);
            vertex(dex_x+23,dex_y-36);
            vertex(dex_x+17,dex_y-33);
            endShape();

            // Hand Gloves
            fill(173,90,255);
            triangle(dex_x-36,dex_y-35,dex_x-26,dex_y-35,dex_x-31,dex_y-33);
            triangle(dex_x+22,dex_y-35,dex_x+33,dex_y-35,dex_x+26,dex_y-33);
            ellipse(dex_x-31,dex_y-32,8,5);
            ellipse(dex_x+28,dex_y-32,8,5);
            ellipse(dex_x-28,dex_y-28,3,7);
            ellipse(dex_x-31,dex_y-28,3,7);
            ellipse(dex_x-34,dex_y-28,3,7);
            ellipse(dex_x+25,dex_y-28,3,7);
            ellipse(dex_x+28,dex_y-28,3,7);
            ellipse(dex_x+31,dex_y-28,3,7);

            // Face Shape
            fill(245,214,196);
            rect(dex_x-22,dex_y-77,42,25);
            ellipse(dex_x-1,dex_y-53,44,46);
            ellipse(dex_x-24,dex_y-47,7,7);
            ellipse(dex_x+22,dex_y-47,7,7);
            triangle(dex_x-15,dex_y-35,dex_x+13,dex_y-35,dex_x+1,dex_y-29);

            // Hair Strokes
            fill(0);
            triangle(dex_x-30,dex_y-81,dex_x-20,dex_y-74,dex_x-20,dex_y-75);
            triangle(dex_x-30,dex_y-79,dex_x-20,dex_y-74,dex_x-20,dex_y-75);
            triangle(dex_x-30,dex_y-74,dex_x-20,dex_y-74,dex_x-20,dex_y-75);

            // Hair
            fill(255,122,66);
            ellipse(dex_x+1,dex_y-75,50,11);
            ellipse(dex_x-1,dex_y-73,15,14);
            ellipse(dex_x+11,dex_y-73,15,14);
            ellipse(dex_x+22,dex_y-72,11,11);

            // Eyes
            fill(0);
            ellipse(dex_x-11,dex_y-53,22,28);
            ellipse(dex_x-11,dex_y-53,22,28);
            ellipse(dex_x+11,dex_y-53,22,28);
            fill(132,188,213);
            ellipse(dex_x-11,dex_y-53,15,25);
            ellipse(dex_x+11,dex_y-53,15,25);
            fill(0);
            ellipse(dex_x-7,dex_y-53,7,11);
            ellipse(dex_x+8,dex_y-53,7,11);

            // Mouth
            fill(245,214,196);
            triangle(dex_x,dex_y-45,dex_x+8,dex_y-45,dex_x,dex_y-42);
            stroke(0,0,0);
            strokeWeight(2);
            line(dex_x-3,dex_y-46,dex_x+8,dex_y-46);
            line(dex_x+8,dex_y-46,dex_x+3,dex_y-42);
            line(dex_x+3,dex_y-42,dex_x+3,dex_y-38);
            noFill();
            beginShape();
            curveVertex(dex_x+4,dex_y-38);
            curveVertex(dex_x+3,dex_y-38);
            curveVertex(dex_x+3,dex_y-37);
            curveVertex(dex_x,dex_y-37);
            curveVertex(dex_x-3,dex_y-38);
            curveVertex(dex_x-5,dex_y-41);
            curveVertex(dex_x-5,dex_y-43);
            endShape();
        }
            
        else
        {
                // standing front facing code
                // Hand Gloves
            fill(173, 90, 255);
            triangle(dex_x-33,dex_y-25,dex_x-14,dex_y-25,dex_x-24,dex_y-21);
            triangle(dex_x+7,dex_y-25,dex_x+26,dex_y-25,dex_x+17,dex_y-21);
            ellipse(dex_x-25,dex_y-21,8,5);
            ellipse(dex_x+18,dex_y-21,8,5);
            ellipse(dex_x-22,dex_y-18,3,7);
            ellipse(dex_x-25,dex_y-18,3,7);
            ellipse(dex_x-28,dex_y-18,3,7);
            ellipse(dex_x+21,dex_y-18,3,7);
            ellipse(dex_x+18,dex_y-18,3,7);
            ellipse(dex_x+15,dex_y-18,3,7);

            // Lab Coat
            fill(238,233,233);
            rect(dex_x-23,dex_y-41,39,28);
            triangle(dex_x-23,dex_y-41,dex_x-23,dex_y-25,dex_x-29,dex_y-25);
            triangle(dex_x+16,dex_y-41,dex_x+24,dex_y-25,dex_x+16,dex_y-25);
            fill(0);
            rect(dex_x-12,dex_y-41,1,28);
            ellipse(dex_x-8,dex_y-21,4,7);

            // Face Shape
            fill(245, 214, 196);
            rect(dex_x-25,dex_y-75,42,25);
            ellipse(dex_x-4,dex_y-55,44,46);
            ellipse(dex_x-27,dex_y-49,7,7);
            ellipse(dex_x+18,dex_y-49,7,7);
            triangle(dex_x-18,dex_y-38,dex_x+10,dex_y-38,dex_x-4,dex_y-30);

            // Hair Strokes
            fill(0);
            triangle(dex_x-32,dex_y-82,dex_x-25,dex_y-75,dex_x-25,dex_y-76);
            triangle(dex_x-33,dex_y-79,dex_x-25,dex_y-75,dex_x-25,dex_y-76);
            triangle(dex_x-33,dex_y-75,dex_x-25,dex_y-75,dex_x-25,dex_y-76);

            // Hair
            fill(255,122,66);
            ellipse(dex_x-2,dex_y-76,50,11);
            ellipse(dex_x-4,dex_y-74,15,14);
            ellipse(dex_x+8,dex_y-74,15,14);
            ellipse(dex_x+18,dex_y-73,11,11);

            // Eyes
            fill(0);
            ellipse(dex_x-14,dex_y-57,22,28);
            ellipse(dex_x-14,dex_y-57,22,28);
            ellipse(dex_x+8,dex_y-57,22,28);
            fill(132,188,213);
            ellipse(dex_x-14,dex_y-57,15,25);
            ellipse(dex_x+8,dex_y-57,15,25);
            fill(0);
            ellipse(dex_x-10,dex_y-57,7,11);
            ellipse(dex_x+4,dex_y-57,7,11);

            // Shoes
            fill(0);
            triangle(dex_x-15,dex_y-13,dex_x+7,dex_y-13,dex_x-23,dex_y,dex_x+18,dex_y);
            triangle(dex_x-15,dex_y-13,dex_x+7,dex_y-13,dex_x+16,dex_y,dex_x+29,dex_y);
            triangle(dex_x-2,dex_y-13,dex_x-6,dex_y,dex_x-17,dex_y);
            triangle(dex_x-4,dex_y-13,dex_x+9,dex_y,dex_x-2,dex_y);
            
            // Mouth
            fill(245,214,196);
            triangle(dex_x-2,dex_y-47,dex_x+4,dex_y-47,dex_x-1,dex_y-43);
            stroke(0,0,0);
            strokeWeight(2);
            line(dex_x-6,dex_y-48,dex_x+5,dex_y-48);
            line(dex_x+5,dex_y-48,dex_x+1,dex_y-44);
            line(dex_x+1,dex_y-44,dex_x+1,dex_y-41);
            noFill();
            beginShape();
            curveVertex(dex_x+2,dex_y-40);
            curveVertex(dex_x+1,dex_y-40);
            curveVertex(dex_x+1,dex_y-39);
            curveVertex(dex_x-1,dex_y-39);
            curveVertex(dex_x-5,dex_y-41);
            curveVertex(dex_x-7,dex_y-43);
            curveVertex(dex_x-8,dex_y-45);
            curveVertex(dex_x-9,dex_y-46);
            endShape();
        }	
   }

   function draw_danger_Zone() // the flagpole!!
   {
            push();
            strokeWeight(8);
            stroke(100);
            line(danger_Zone.x, floor_y,danger_Zone.x,floor_y-250);
            stroke(0,0,0)
            fill(0,0,0);
    
        if(danger_Zone.isReached)
        {
            triangle(danger_Zone.x, floor_y-252,danger_Zone.x-50, floor_y-177, danger_Zone.x+50, floor_y-177);
            noStroke();
            fill(255,204,0);
            triangle(danger_Zone.x, floor_y-247,danger_Zone.x-45, floor_y-179, danger_Zone.x+45, floor_y-179);
            fill(0,0,0)
            beginShape();
            vertex(danger_Zone.x-5,floor_y-230);
            vertex(danger_Zone.x-19,floor_y-205);
            vertex(danger_Zone.x-3,floor_y-205);
            vertex(danger_Zone.x-10,floor_y-184);
            vertex(danger_Zone.x+13,floor_y-215);
            vertex(danger_Zone.x-3,floor_y-215);
            vertex(danger_Zone.x+5,floor_y-230);
            vertex(danger_Zone.x-8,floor_y-230);
            endShape();
            fill(255,0,0)
            text("POWER",danger_Zone.x-28,floor_y-180)
        }
        else
        {
            triangle(danger_Zone.x, floor_y-52,danger_Zone.x-50, floor_y+23, danger_Zone.x+50, floor_y+23);
            noStroke();
            fill(255,204,0);
            triangle(danger_Zone.x, floor_y-47,danger_Zone.x-45, floor_y+21, danger_Zone.x+45, floor_y+21);
            fill(0,0,0)
            beginShape();
            vertex(danger_Zone.x-5,floor_y-30);
            vertex(danger_Zone.x-19,floor_y-5);
            vertex(danger_Zone.x-3,floor_y-5);
            vertex(danger_Zone.x-10,floor_y+16);
            vertex(danger_Zone.x+13,floor_y-15);
            vertex(danger_Zone.x-3,floor_y-15);
            vertex(danger_Zone.x+5,floor_y-30);
            vertex(danger_Zone.x-8,floor_y-30);
            endShape();
            fill(255,0,0)
            text("POWER",danger_Zone.x-28,floor_y+20)
        }
        pop();
   }

   function danger_Zone_Interativity()
   {
        var d = abs(dex_x - danger_Zone.x);
        if(d<15)
        {
            danger_Zone.isReached = true;
            level_Compelete_Sound.play();
        }
       
   }

   function start_dexters_Lab()
   {        

                //setting up all the background scenery objects

            floor_x=0;

            wwd = { y:500 }; 
            wwd_x = [-500,500,1500,2500];

            gun = { y: 200 };
            gun_x = [-800,200,1200,2200];

            table = { y: 330 };
            table_x = [-850,150,1150,2150];

            router = { y: 330 };
            router_x = [-820,180,1180,2180];

            mac1 = { y: 300 };
            mac1_x = [-750,250,1250,2250];

            mac2 = { y: 250 };
            mac2_x = [-650,350,1350,2350];

            skull = { y: 300 };
            skull_x = [-650,350,1350,2350];
           
            mscreen = { y: 250 };
            mscreen_x = [-550,450,1450,2450];

            mbody = { y: 350 };
            mbody_x = [-550,450,1450,2450];

            mantena = { y: 50 };
            mantena_x = [-450,550,1550,2550];

            poison = { y: 300 };
            poison_x = [-200,800,1800,2800];

            light = { y: 100 };
            light_x = [-800,200,1200,2200];
            
            canyon =[ { x:250, y:450, width:76 },
                      { x:640, y:450, width:76 },
                      { x:1200, y:450, width:76 },
                      { x:1700, y:450, width:76 },
                      { x:1950, y:450, width:76 },
                      { x:2500, y:450, width:76 },
                      { x:-100, y:450, width:76 },
                      { x:-500, y:450, width:76 },
                      { x:-900, y:450, width:76 },
            ];

            flask =[ { x:20, y:310, size:2,isFound: false},   
                     { x:410, y:190, size:2,isFound: false}, 
                     { x:550, y:310, size:2,isFound: false}, 
                     { x:560, y:10, size:2,isFound: false}, 
                     { x:250, y:80, size:2,isFound: false},
                     { x:100, y:190, size:2,isFound: false},
                     { x:800, y:310, size:2,isFound: false},
                     { x:940, y:190, size:2,isFound: false},
                     { x:1060, y:120, size:2,isFound: false},
                     { x:1170, y:20, size:2,isFound: false},
                     { x:1400, y:90, size:2,isFound: false},
                     { x:1870, y:210, size:2,isFound: false},
                     { x:1870, y:-10, size:2,isFound: false},
                     { x:2230, y:140, size:2,isFound: false},
                     { x:2430, y:140, size:2,isFound: false}, 
                     { x:2880, y:310, size:2,isFound: false},
                     { x:-350, y:80, size:2,isFound: false},
                     { x:-250, y:180, size:2,isFound: false}, 
           ];
            
            dex_x=width/2;
            dex_y=floor_y;

            isLeft=false;
            isRight=false;
            isFalling=false;
            isPlummeting=false;

            platforms = [];
            platforms.push(createPlatforms(60,floor_y-130,100));
            platforms.push(createPlatforms(160,floor_y-240,100));
            platforms.push(createPlatforms(260,floor_y-240,100));
            platforms.push(createPlatforms(370,floor_y-130,100));
            platforms.push(createPlatforms(470,floor_y-300,100));
            platforms.push(createPlatforms(570,floor_y-300,100));
            platforms.push(createPlatforms(900,floor_y-130,100));
            platforms.push(createPlatforms(1020,floor_y-200,100));
            platforms.push(createPlatforms(1120,floor_y-300,100));
            platforms.push(createPlatforms(1220,floor_y-300,100));
            platforms.push(createPlatforms(1370,floor_y-230,100));
            platforms.push(createPlatforms(1470,floor_y-230,100));
            platforms.push(createPlatforms(1830,floor_y-100,100));
            platforms.push(createPlatforms(1830,floor_y-330,100));
            platforms.push(createPlatforms(2190,floor_y-160,100));
            platforms.push(createPlatforms(2390,floor_y-160,100));
            platforms.push(createPlatforms(-280,floor_y-130,100));
            platforms.push(createPlatforms(-380,floor_y-220,100));

            flask_Counter = 0;

            danger_Zone = { isReached: false, x:3000 }

            enemies = [];
            enemies.push(new Evil_R(360,floor_y-10,40));
            enemies.push(new Evil_R(980,floor_y-10,100));
            enemies.push(new Evil_R(600,floor_y-335,30));
            enemies.push(new Evil_R(1260,floor_y-330,30));
            enemies.push(new Evil_R(1490,floor_y-270,50));
            enemies.push(new Evil_R(2100,floor_y-30,50));
            enemies.push(new Evil_R(2300,floor_y-30,70));
            enemies.push(new Evil_R(2700,floor_y-30,100));
            enemies.push(new Evil_R(-700,floor_y-30,60));

            cameraPosX=0;
    }

    function check_dexter_die()
    { 
        if(dex_y > canvas.height)
        {
            if(battery > 0 || battery <=3)
            {
               battery -=1;
               start_dexters_Lab();
            }
        }
    }

    function drawScoreDisplay()
    {
        fill(219, 135, 33);
        rect(70,56,75,20);
        fill(61, 60, 58);
        rect(73,58,69,16);
    }

    function Evil_R(x,y,range) // Enemy Constructor
    {
        this.x = x;
        this.y = y;
        this.range = range;

        this.currentX = x;
        this.inc = 1;

        this.update = function()
        {
            this.currentX += this.inc;

            if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
            }
            else if(this.currentX < this.x)
            {
                this.inc = 1;
            }
        }

        this.draw = function()
        {
            this.update();
            
            //Robot Legs
            fill(130, 130, 130);
            rect(this.currentX+10,this.y+26,6,16);
            rect(this.currentX+26,this.y+26,6,16);
            fill(62, 188, 201);
            rect(this.currentX+2,this.y+36,15,8,5);
            rect(this.currentX+24,this.y+36,15,8,5);
            fill(150, 11, 108);
            rect(this.currentX+2,this.y+41,15,3,5);
            rect(this.currentX+24,this.y+41,15,3,5);
            fill(0);
            rect(this.currentX+10,this.y+30,6,2);
            rect(this.currentX+26,this.y+30,6,2);
            rect(this.currentX+10,this.y+36,6,2);
            rect(this.currentX+26,this.y+36,6,2);
            
            //Robot Arms
            fill(130, 130, 130);
            rect(this.currentX-18,this.y+2,14,4);
            rect(this.currentX+48,this.y+2,14,4);
            rect(this.currentX-18,this.y-12,4,14);
            rect(this.currentX+58,this.y-12,4,14);
            fill(62, 188, 201);
            rect(this.currentX-20,this.y-12,8,8);
            rect(this.currentX+56,this.y-12,8,8);
            fill(0);
            rect(this.currentX-14,this.y+2,2,4);
            rect(this.currentX+56,this.y+2,2,4);
            rect(this.currentX-18,this.y-1,4,2);
            rect(this.currentX+58,this.y-1,4,2);
            rect(this.currentX-20,this.y-9,2,2);
            rect(this.currentX+62,this.y-9,2,2);
            rect(this.currentX-16,this.y-11,4,2);
            rect(this.currentX+56,this.y-11,4,2);
            rect(this.currentX-16,this.y-7,4,2);
            rect(this.currentX+56,this.y-7,4,2);
            rect(this.currentX-18,this.y-11,2,6);
            rect(this.currentX+60,this.y-11,2,6);
        
            //Robot Main Body
            fill(150, 11, 108);
            ellipse(this.currentX-4,this.y+4,10,10);
            ellipse(this.currentX+48,this.y+4,10,10);
            fill(97, 65, 125);
            ellipse(this.currentX+22,this.y,50,35);
            rect(this.currentX-4,this.y,50,22);
            fill(209, 114, 6);
            rect(this.currentX,this.y,42,30);
            fill(62, 188, 201);
            rect(this.currentX,this.y,42,26);
            fill(150, 11, 108);
            rect(this.currentX-4,this.y,50,22);
            fill(97, 65, 125);
            rect(this.currentX-4,this.y,50,18);
            
            //Robot Smile
            fill(255);
            ellipse(this.currentX+22,this.y+4,37,27);
            fill(0);
            rect(this.currentX+21,this.y+4,2,14);
            rect(this.currentX+26,this.y+4,2,14);
            rect(this.currentX+15,this.y+4,2,14);
            rect(this.currentX+33,this.y+4,2,11);
            rect(this.currentX+9,this.y+4,2,11);
            fill(97, 65, 125);
            ellipse(this.currentX+22,this.y-2,37,20);
            
            //Robot Eyes and Lightbulb
            fill(244, 247, 74);
            rect(this.currentX+19,this.y-23,8,5);
            ellipse(this.currentX+23,this.y-28,15,15);
            fill(44, 195, 222);
            rect(this.currentX+18,this.y-14,10,5,3);
            fill(150, 11, 108);
            rect(this.currentX+18,this.y-18,10,5,3);
            fill(150, 11, 108);
            ellipse(this.currentX+16,this.y-6,15,15);
            ellipse(this.currentX+30,this.y-7,12,12);
            fill(0);
            arc(this.currentX+16,this.y-8,15,20,0,PI);
            arc(this.currentX+30,this.y-9,12,18,0,PI);
            fill(62, 188, 201);
            ellipse(this.currentX+16,this.y-6,5,5);
            ellipse(this.currentX+30,this.y-7,5,5);
            fill(0);
            rect(this.currentX+22,this.y-25,2,7);
            ellipse(this.currentX+23,this.y-28,7,7);
            fill(244, 247, 74);
            ellipse(this.currentX+23,this.y-30,7,7);
            
        }

        this.checkContact = function(gc_x,gc_y)
        {
            var d = dist(gc_x, gc_y, this.currentX, this.y)

            if(d < 45)
            {
                return true;
            }
            return false;
        }
    }

    function createPlatforms(x, y, length) // Platform Constructor
    {
        var p =
        {
            x : x,
            y : y,
            length :length,
            draw : function()
            {
            fill(0);
            rect(this.x-4,this.y-4,this.length+11,28);
            fill(209, 114, 6)
            rect(this.x+2, this.y, this.length,20);
            fill(0);
            rect(this.x+5,this.y,this.length-95,4);
            rect(this.x+20,this.y,this.length-95,4);
            rect(this.x+35,this.y,this.length-95,4);
            rect(this.x+50,this.y,this.length-95,4);
            rect(this.x+65,this.y,this.length-95,4);
            rect(this.x+80,this.y,this.length-95,4);
            rect(this.x+94,this.y,this.length-95,4);
            text('Caution! Caution!',this.x+5,this.y+14)
            rect(this.x+5,this.y+16,this.length-95,4);
            rect(this.x+20,this.y+16,this.length-95,4);
            rect(this.x+35,this.y+16,this.length-95,4);
            rect(this.x+50,this.y+16,this.length-95,4);
            rect(this.x+65,this.y+16,this.length-95,4);
            rect(this.x+80,this.y+16,this.length-95,4);
            rect(this.x+94,this.y+16,this.length-95,4);
            },
            checkContact: function(gc_x,gc_y)
            {
               if(gc_x > this.x && gc_x < this.x + this.length)
            {
               var d = this.y - gc_y;
               if(d >= 0 && d < 5)
                {
                    return true;
                }
            }
                return false;
            }
        }
        return p;
    }  
