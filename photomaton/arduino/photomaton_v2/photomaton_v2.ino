#include <Bounce.h>
#include <Encoder.h>
#include <stdio.h>
#include <stdlib.h>

#define WIRE_LED_1  10
#define WIRE_LED_2  12
#define WIRE_LED_3  11
#define WIRE_USB    9

#define WIRE_POT    23
#define WIRE_PHOTO  22
#define WIRE_EFFECT 21
#define WIRE_CHANGE 20
#define WIRE_NEXT   19
#define WIRE_PREV   18
#define WIRE_PRINT  17
#define WIRE_DEL    16

#define WIRE_POT_1  5
#define WIRE_POT_2  6

#define KEY_PHOTO       KEY_B 
#define KEY_EFFECT      KEY_E
#define KEY_CHANGE      KEY_N
#define KEY_NEXT        KEY_L
#define KEY_PREV        KEY_K
#define KEY_PRINT       KEY_P
#define KEY_DEL         KEY_D
#define KEY_EFFECT_PLUS KEY_I
#define KEY_EFFECT_MIN  KEY_U
#define KEY_USB         KEY_S

Bounce buttonPhoto = Bounce(WIRE_PHOTO, 10);
Bounce buttonEffect = Bounce(WIRE_EFFECT, 10);
Bounce buttonChange = Bounce(WIRE_CHANGE, 10);
Bounce buttonPrev = Bounce(WIRE_PREV, 10);
Bounce buttonNext = Bounce(WIRE_NEXT, 10);
Bounce buttonPrint = Bounce(WIRE_PRINT, 10);
Bounce buttonDelete = Bounce(WIRE_DEL, 10);
Bounce buttonUsb = Bounce(WIRE_USB, 10);

static int lastPotValue = -1;

Encoder effect(WIRE_POT_1, WIRE_POT_2);

void setup() {                
  // initialize the digital pin as an output.
  Serial.begin(9600);
  pinMode(WIRE_LED_1, OUTPUT);
  pinMode(WIRE_LED_2, OUTPUT);
  pinMode(WIRE_LED_3, OUTPUT);
  pinMode(WIRE_USB, INPUT_PULLUP);
  pinMode(WIRE_POT, INPUT);
  pinMode(WIRE_PHOTO, INPUT_PULLUP);
  pinMode(WIRE_EFFECT, INPUT_PULLUP);
  pinMode(WIRE_CHANGE, INPUT_PULLUP);
  pinMode(WIRE_NEXT, INPUT_PULLUP);
  pinMode(WIRE_PREV, INPUT_PULLUP);
  pinMode(WIRE_PRINT, INPUT_PULLUP);
  pinMode(WIRE_DEL, INPUT_PULLUP);

  effect.write(0);
}

void loop() {
  //On lit le port serie pour voir si quelque chose a changer
  readSerial();
  /*
  //On ecrit sur le port serie pour voir si le potar a changer
  writeSerial();
  */
  //On test les différentes touches
  buttonPress(&buttonPhoto, KEY_PHOTO);
  buttonPress(&buttonEffect, KEY_EFFECT);
  buttonPress(&buttonChange, KEY_CHANGE);
  buttonPress(&buttonPrev, KEY_PREV);
  buttonPress(&buttonNext, KEY_NEXT);
  buttonPress(&buttonPrint, KEY_PRINT);
  buttonPress(&buttonDelete, KEY_DEL);
  buttonPress(&buttonUsb, KEY_USB);
  //On test un changement du curseur
  testChangeEffect();
}

void testChangeEffect() {
  long newPos = effect.read();
  if (newPos > 0) {
        Keyboard.set_modifier(0);
        Keyboard.set_key1(KEY_EFFECT_PLUS);
        Keyboard.send_now();
        Keyboard.set_key1(0);
        Keyboard.send_now();
  } else if (newPos < 0) {
        Keyboard.set_modifier(0);
        Keyboard.set_key1(KEY_EFFECT_MIN);
        Keyboard.send_now();
        Keyboard.set_key1(0);
        Keyboard.send_now();      
  }
  effect.write(0);
}

void readSerial() {
  if (Serial.available() > 0) {
        byte x = Serial.read();
        switch (x) {
           case '0' : {
             digitalWrite(WIRE_LED_1, LOW);
             digitalWrite(WIRE_LED_2, LOW);
             digitalWrite(WIRE_LED_3, LOW);
             break;
           } 
           case '1' : {
             digitalWrite(WIRE_LED_1, HIGH);
             digitalWrite(WIRE_LED_2, LOW);
             digitalWrite(WIRE_LED_3, LOW);             
             break;
           }    
           case '2' : {
             digitalWrite(WIRE_LED_1, HIGH);
             digitalWrite(WIRE_LED_2, HIGH);
             digitalWrite(WIRE_LED_3, LOW);  
             break;
           }
           case '3' : {
             digitalWrite(WIRE_LED_1, HIGH);
             digitalWrite(WIRE_LED_2, HIGH);
             digitalWrite(WIRE_LED_3, HIGH);  
             break;
           } 
      }
  }
}

/*
void writeSerial() {
  int potValue = analogRead(WIRE_POT);
  potValue = map(potValue, 0, 1023, 0, 253);

  if ((potValue > (lastPotValue + 2)) || (potValue < (lastPotValue - 2))) {
    lastPotValue = potValue;
    Serial.println(potValue);
  }
  delay(100);
}
*/

void buttonPress(Bounce *b, int key) {
  if (b->update()) {
    if (b->fallingEdge()) {
        Keyboard.set_modifier(0);
        Keyboard.set_key1(key);
        Keyboard.send_now();
        Keyboard.set_key1(0);
        Keyboard.send_now();
    }
  }
}
