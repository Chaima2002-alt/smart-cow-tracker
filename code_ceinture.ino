#include <TinyGPS++.h>
#include <HardwareSerial.h>
#include <Wire.h>
#include <Adafruit_MLX90614.h>
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <ThingSpeak.h>

// WiFi
#define WIFI_SSID "EPI-STUDENTS"
#define WIFI_PASSWORD "epietud2025"

// Firebase
#define API_KEY "AIzaSyDmb8rLnRcmRU1TublAKY34P_x5mhyzFJQ"
#define DATABASE_URL "https://ceinture-a99d5-default-rtdb.firebaseio.com/"
#define USER_EMAIL "vache@epi.tn"
#define USER_PASSWORD "123456"

// ThingSpeak
#define CHANNEL_ID 2933184
#define THINGSPEAK_API_KEY "7WCB36VRU4MKYG8M"

// GPS
#define RXD2 16
#define TXD2 17
HardwareSerial GPSserial(2);
TinyGPSPlus gps;

// Firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// ThingSpeak
WiFiClient client;

// Capteur température
Adafruit_MLX90614 mlx = Adafruit_MLX90614();

// ECG
const int ecgPin = 34;
const int loPlusPin = 33;
const int loMinusPin = 32;

void setup() {
  Serial.begin(115200);
  GPSserial.begin(9600, SERIAL_8N1, RXD2, TXD2);
  Serial.println("🚀 Initialisation...");

  // Connexion Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connexion Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Wi-Fi connecté !");
  Serial.println(WiFi.localIP());

  // Firebase
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.token_status_callback = [](TokenInfo info) {
    if (info.status == token_status_ready) {
      Serial.println("✅ Authentification Firebase réussie !");
    }
  };
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // MLX90614
  if (!mlx.begin()) {
    Serial.println("❌ Erreur capteur température !");
  } else {
    Serial.println("✅ MLX90614 détecté.");
  }

  // ECG
  pinMode(ecgPin, INPUT);
  pinMode(loPlusPin, INPUT);
  pinMode(loMinusPin, INPUT);

  // ThingSpeak
  ThingSpeak.begin(client);
}

void loop() {
  // 🔥 Lecture ECG
  int ecgSignal = analogRead(ecgPin);
  Serial.printf("💓 ECG : %d\n", ecgSignal);
  envoyerFirebase("/vaches/vache1/ecg", ecgSignal);
  ThingSpeak.setField(1, ecgSignal); // ECG → Field1

  // 🌡️ Température
  float temp = mlx.readObjectTempC();
  if (!isnan(temp)) {
    Serial.printf("🌡️ Température : %.2f°C\n", temp);
    envoyerFirebase("/vaches/vache1/temperature", temp);
    ThingSpeak.setField(2, temp); // Temp → Field2
  }

  // 📍 GPS
  float lat = 0.0, lon = 0.0;
  String time = "unknown";

  // Lire et attendre un fix GPS VALIDE (position + satellites ≥ 4)
  while (!gps.location.isValid() || gps.satellites.value() < 4) {
    while (GPSserial.available()) {
      gps.encode(GPSserial.read());
    }
    Serial.println("🔄 En attente du signal GPS...");
    delay(1000);
  }

  // Lire les données GPS
  lat = gps.location.lat();
  lon = gps.location.lng();
  time = gps.time.isValid()
            ? String(gps.time.hour()) + ":" + String(gps.time.minute()) + ":" + String(gps.time.second())
            : "unknown";

  Serial.printf("📍 GPS : %.6f, %.6f à %s\n", lat, lon, time.c_str());

  // Envoyer vers Firebase
  envoyerFirebase("/vaches/vache1/gps/latitude", lat);
  envoyerFirebase("/vaches/vache1/gps/longitude", lon);
  Firebase.setString(fbdo, "/vaches/vache1/gps/time", time);

  // 🛰️ Satellites & HDOP
  if (gps.satellites.isValid()) {
    Serial.printf("🛰️ Satellites utilisés : %d\n", gps.satellites.value());
  } else {
    Serial.println("❌ Nombre de satellites non disponible.");
  }

  if (gps.hdop.isValid()) {
    Serial.printf("📶 HDOP (précision) : %.2f\n", gps.hdop.hdop());
  }

  // ThingSpeak : toujours envoyer les dernières valeurs GPS
  ThingSpeak.setField(3, lat); // Lat → Field3
  ThingSpeak.setField(4, lon); // Lon → Field4

  // 📤 Envoi vers ThingSpeak
  if (WiFi.status() == WL_CONNECTED) {
    int x = ThingSpeak.writeFields(CHANNEL_ID, THINGSPEAK_API_KEY);
    if (x == 200) {
      Serial.println("✅ Données envoyées à ThingSpeak !");
    } else {
      Serial.printf("❌ Échec ThingSpeak, code : %d\n", x);
    }
  } else {
    Serial.println("⚠️ WiFi déconnecté !");
  }

  delay(15000); // Délai minimum pour ThingSpeak
}

void envoyerFirebase(String chemin, float valeur) {
  if (Firebase.ready()) {
    if (Firebase.setFloat(fbdo, chemin, valeur)) {
      Serial.println("📤 Firebase : " + chemin + " → OK");
    } else {
      Serial.println("❌ Firebase : " + chemin + " → " + fbdo.errorReason());
    }
  }
}
