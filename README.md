# 🗑️ Garbage Classifier with MobileNetV2

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python) ![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange?logo=tensorflow) ![License](https://img.shields.io/badge/License-MIT-green)

A deep learning model to classify images of garbage into six categories: **plastic, metal, glass, cardboard, paper, and trash**. The model uses **MobileNetV2** for transfer learning with a custom 128-filter convolutional layer to enhance feature extraction.

---

## 📝 Overview
This project automates waste classification to support recycling and waste management. By fine-tuning MobileNetV2, it achieves high accuracy while remaining lightweight and efficient.

---

## 📂 Dataset
The model is trained on the [Garbage Images Dataset (2000/class)](https://www.kaggle.com/datasets/zlatan599/garbage-dataset-classification/data), which contains 2,000 images per class across six categories. Images are organized in folders per class.

**Classes:**
- Plastic  
- Metal  
- Glass  
- Cardboard  
- Paper  
- Trash  

---

## 🏗️ Model Architecture
- **Base Model**: MobileNetV2 pre-trained on ImageNet (top layers removed)  
- **Custom Layer**: Convolutional layer with 128 filters, ReLU activation  
- **Pooling**: Global Average Pooling  
- **Output Layer**: Dense layer with softmax activation for six-class classification  

---

## 📊 Evaluation

- **Training Accuracy:** 99%  
- **Validation Accuracy:** 95%  
- **Test Accuracy:** 95%  

*Metrics are based on an 80/20 train-validation split and may vary with different splits.*
