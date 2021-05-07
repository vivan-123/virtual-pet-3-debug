class Food
{
    constructor()
    {
        this.lastfed;
        this.foodstock;
        //this.milkbottle = loadImage("images/Milk.png")
    }

    /*milkbottle1 = createSprite(100,200);
    milkbottle1.addImage("milkbottleanimation",milkbottleimg);
    milkbottle2 = createSprite(150,200);
    milkbottle2.addImage("milkbottle2animation",milkbottleimg);
    milkbottle3 = createSprite(200,200);
    milkbottle3.addImage("milkbottle3animation",milkbottleimg);
    milkbottle4 = createSprite(250,200);
    milkbottle4.addImage("milkbottle4animation",milkbottleimg);
    */

    getFoodStock()
    {        
        var foodref = database.ref("food");
        foodref.on("value", readpos, errorpos);

        var foodstockref = database.ref("foodstock");
        foodstockref.on("value", readpos2, errorpos);

        database.ref("/").set({ foodstock : 5,
        food : 0 }) 
    }

    

    updateFoodStock()
    {
    
         
            database.ref("/").update({ foodstock : foodstock + 1,
            food : food })
            doggo.changeImage("doggoanimation", dog)
         
    }

    deductFoodStock()
    {
        
         
            doggo.changeImage("happydoganimation",happydog) 
            database.ref("/").update({ food : food + 1,
            foodstock : foodstock -1 }) 
        
    }


    display()
    {
        var milk = database.ref("foodstock")
        for (var i = 0;i < milk;i++)
        {
            image (this.milkbottle,250,250,this.milkbottle.width,this.milkbottle.height)
        }
        
    }
}