import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pet Global',
      home: Scaffold(
        appBar: AppBar(title: const Text('?? Pet Global')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton.icon(
                onPressed: () => _launchUrl('https://bit.ly/40BrainDogs'),
                icon: const Icon(Icons.brain),
                label: const Text('?? Entrena a tu Perro HOY (75% OFF)'),
              ),
              const SizedBox(height: 20),
              ElevatedButton.icon(
                onPressed: () => _launchUrl('https://temu.com?_bg_fs=1&_x_ads_sub=20250424151324-468981'),
                icon: const Icon(Icons.shopping_cart),
                label: const Text('?? Accesorios en Temu (20% Comisión)'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _launchUrl(String url) async {
    if (await canLaunch(url)) await launch(url);
  }
}
