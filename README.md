# Initial Setup
    
   Clone this repository <br />
   ``` cd imageToMinecraft ``` <br />
   Put any images you want available into the /images folder. Note that only .png images are currently supported. <br />
   Run ``` docker-compose up --build``` <br />
   - If you don't have Docker, you can run <br /> ``` npm install --production && node ./dist/v1.1.0 ``` 
   
   <b>In Minecraft</b> run the command : ``` /connect localhost:8080 ``` <br />
   
   ## <b>Use in-game commands to load and draw your image into your Minecraft World! </b> <br /><br />
   
   ### This is only tested on Bedrock edition, and is only available on some devices. 

   <br /><br />

### From zip.
    //todo


# In-Game Commands

## "!load"

    Currently only .png images are supported. 

#### Args
- [0] image-name : Only the name of the image, no extension.

#### Example
``` !load colorWheel ```

---

## "!draw"

#### Args

- [0] v | h : v for verticle image, h for horizontal 
- [1] - x : where to place the top left corner of the image
- [2] - y : where to place the top left corner of the image
- [3] - z : where to place the top left corner of the image
- [4] - true | false : true for color, false for greyscale
- [5] - true | false : true to ignore whitespace.


#### Example

``` !draw h 100 0 100 true true ```

Draws the loaded image horizontally starting at (100, 0, 100) using color image and ignoring whitespace.

#### Note : 
    For verticle images, the top left corner of the given images will be at the coordinates given. The image then draws in a positive direction along the x axis and negative along the y axis. Left to right, top to bottom. 

    For example, if the image is 100 pixels x 100 pixels and you give the command "!draw v 0 100 0 true" the four corners would be at the following locations:
        top-left : (0, 100, 0)
        top-right : (100, 100, 0)
        bottom-left : (0, 0, 0)
        bottom-right : (100, 0, 0)


    Horizontal images work in the same perspective as in-game maps; moving in a positive x and z direction. 

    For example, if the image is 100 pixels x 100 pixels, and you give the command "!draw h 0 0 0 true" the four corners would be at the following locations:
        top-left : (0, 0, 0)
        top-right : (100, 0, 0)
        bottom-left : (0, 0, 100)
        bottom-right : (100, 0, 100)

    If you elect to ignore whitespace, the top corner of your image will depend on where the top-leftmost pixel is located. 
--- 