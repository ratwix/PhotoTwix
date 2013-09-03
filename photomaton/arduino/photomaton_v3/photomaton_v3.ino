#include <Bounce.h>
#include <stdio.h>

#include <stdlib.h>

#define WIRE_LEFT    3
#define WIRE_GREEN   1
#define WIRE_RIGHT   4
#define WIRE_BLUE    2
#define WIRE_USB     5
#define WIRE_ARCADE  6
#define WIRE_PHOTO   7

#define LED          13

#define K_PHOTO       KEY_B 
#define K_VIOLET      KEY_V
#define K_GREEN       KEY_G
#define K_LEFT        KEY_L
#define K_RIGHT       KEY_R
#define K_USB         KEY_U
#define K_MENU        KEY_J
#define K_RELOAD      KEY_F5
#define K_ARCADE      KEY_C    //Press CTRL + ALT + C for launch arcade / photo switch script

#define WAIT_DELAY         5000
#define WAIT_DELAY_SHORT   30

Bounce buttonPhoto = Bounce(WIRE_PHOTO, 10);
Bounce buttonViolet = Bounce(WIRE_BLUE, 10);
Bounce buttonGreen = Bounce(WIRE_GREEN, 10);
Bounce buttonLeft = Bounce(WIRE_LEFT, 10);
Bounce buttonRight = Bounce(WIRE_RIGHT, 10);
Bounce buttonUsb = Bounce(WIRE_USB, 10);
Bounce buttonArcade = Bounce(WIRE_ARCADE, 10);

boolean  longPressUsed = false;
boolean  shortPressUsed = false;

void setup() {
  Serial.begin(9600);  
  pinMode(WIRE_PHOTO, INPUT_PULLUP);
  pinMode(WIRE_BLUE, INPUT_PULLUP);
  pinMode(WIRE_GREEN, INPUT_PULLUP);
  pinMode(WIRE_LEFT, INPUT_PULLUP);
  pinMode(WIRE_RIGHT, INPUT_PULLUP);
  pinMode(WIRE_USB, INPUT_PULLUP);
  pinMode(WIRE_ARCADE, INPUT_PULLUP);
  
  pinMode(LED, OUTPUT);
  digitalWrite(LED, HIGH);
}

void loop() {
  //On test les différentes touches
  buttonPressShort(&buttonPhoto, K_PHOTO, 0);
  buttonPressShort(&buttonViolet, K_VIOLET, 0);
  buttonPressShort(&buttonGreen, K_GREEN, 0);
  buttonPressShort(&buttonLeft, K_LEFT, 0);
  buttonPressShort(&buttonRight, K_RIGHT, 0);
  buttonPressShort(&buttonUsb, K_USB, 0);
  buttonPressShort(&buttonArcade, 0, 0);
  buttonPressLong(&buttonUsb, K_MENU, 0);
  buttonPressLong(&buttonGreen, K_RELOAD, 0);
  buttonPressLong(&buttonArcade, K_ARCADE, 0);//MODIFIERKEY_CTRL | MODIFIERKEY_ALT);
  resetAllButton();
}
void resetAllButton() {
  buttonPhoto.update();
  buttonViolet.update();
  buttonGreen.update();
  buttonLeft.update();
  buttonRight.update();
  buttonUsb.update();
  buttonArcade.update();
  if (buttonPhoto.read() == HIGH &&
      buttonViolet.read() == HIGH &&
      buttonGreen.read() == HIGH &&
      buttonLeft.read() == HIGH &&
      buttonRight.read() == HIGH &&
      buttonUsb.read() == HIGH &&
      buttonArcade.read() == HIGH) {
        shortPressUsed = false;
        longPressUsed = false;
   }
}

void buttonPressShort(Bounce *b, int key, int modifier) {
  b->update();
  if (b->read() == LOW) {
    if (b->duration() > WAIT_DELAY_SHORT)   {
      if (shortPressUsed == false) {
          pressKey(key, modifier);
          shortPressUsed = true;
      }
    }
  }
}

void buttonPressLong(Bounce *b, int key, int modifier) {
  if (b->read() == LOW) {
    if (b->duration() > WAIT_DELAY)   {
        if (longPressUsed == false) {
          pressKey(key, modifier);
          longPressUsed = true;
        }
    }
  }
}

void pressKey(int key, int modifier) {
  Keyboard.set_modifier(modifier);
  Keyboard.set_key1(key);
  Keyboard.send_now();
  Keyboard.set_modifier(0);
  Keyboard.set_key1(0);
  Keyboard.send_now();  
}
