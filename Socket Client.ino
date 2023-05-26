#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <string>

const int sensor_pin = A0;
int sensor_value = 0;

const uint16_t port = 8585;
const char *host = "192.168.1.70";
const string ussid = "Rodrigo's Phone";
const string password = "bf9292jfi9q1";

WiFiClient client;
void setup()
{
    pinMode(12, OUTPUT);
    pinMode(14, OUTPUT);
    pinMode(2, OUTPUT);

    Serial.begin(115200);
    Serial.println("Connecting...\n");
    WiFi.mode(WIFI_STA);
    WiFi.begin(ussid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
}

void state_1()
{
  digitalWrite(12, HIGH);
  digitalWrite(14, LOW);
  digitalWrite(2, LOW);
}

void state_2()
{
  digitalWrite(12, LOW);
  digitalWrite(14, HIGH);
  digitalWrite(2, LOW);
}

void state_3()
{
  digitalWrite(12, LOW);
  digitalWrite(14, LOW);
  digitalWrite(2, HIGH);
}

void loop()
{
    if (!client.connect(host, port))
    {
        Serial.println("Connection to host failed");
        delay(1000);
        return;
    }

    sensor_value = analogRead(sensor_pin);

    if (sensor_value >= 152) state_1();
    else if (sensor_value < 152 && sensor_value >= 120) state_2();
    else if (sensor_value < 120 && sensor_value >= 90) state_3();

    Serial.println("Sending message: " + sensor_value);
    client.println(sensor_value);
    delay(500);

    while (client.available() > 0)
    {
        char c = client.read();
        Serial.write(c);
    }
    Serial.print('\n');
    client.stop();
    delay(5000);
}