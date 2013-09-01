#include <Bounce.h>
#include <stdio.h>
#include <stdlib.h>

#define WIRE_PHOTO   1
#define WIRE_VIOLET  2
#define WIRE_GREEN   3
#define WIRE_LEFT    4
#define WIRE_RIGHT   5
#define WIRE_USB     6
#define WIRE_ARCADE  7

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

Bounce buttonPhoto = Bounce(WIRE_PHOTO, 10);
Bounce buttonViolet = Bounce(WIRE_VIOLET, 10);
Bounce buttonGreen = Bounce(WIRE_GREEN, 10);
Bounce buttonLeft = Bounce(WIRE_LEFT, 10);
Bounce buttonRight = Bounce(WIRE_RIGHT, 10);
Bounce buttonUsb = Bounce(WIRE_USB, 10);
Bounce buttonArcade = Bounce(WIRE_ARCADE, 10);

boolean  longPressUsed = false;

void setup() {
  Serial.begin(9600);  
  pinMode(WIRE_PHOTO, INPUT_PULLUP);
  pinMode(WIRE_VIOLET, INPUT_PULLUP);
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
  buttonPress(&buttonPhoto, K_PHOTO);
  buttonPress(&buttonViolet, K_VIOLET);
  buttonPress(&buttonGreen, K_GREEN);
  buttonPress(&buttonLeft, K_LEFT);
  buttonPress(&buttonRight, K_RIGHT);
  buttonPress(&buttonUsb, K_USB);
  buttonPress(&buttonArcade, 0);
  buttonPressLong(&buttonUsb, K_MENU, 0);
  buttonPressLong(&buttonPhoto, K_RELOAD, 0);
  buttonPressLong(&buttonArcade, K_ARCADE, MODIFIERKEY_CTRL | MODIFIERKEY_ALT);
}

void buttonPress(Bounce *b, int key) {
  if (b->update()) {
    if (b->fallingEdge()) {
      pressKey(key, 0);
      longPressUsed = false;
    }
  }
}

void buttonPressLong(Bounce *b, int key, int modifier) {
  if (b->read() == LOW) {
      Serial.println(b->duration());
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
