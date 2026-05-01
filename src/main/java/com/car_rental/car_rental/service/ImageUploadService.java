package com.car_rental.car_rental.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageUploadService {

  private final Cloudinary cloudinary;

  @Autowired
  public ImageUploadService(Cloudinary cloudinary) {
    this.cloudinary = cloudinary;
  }

  public String uploadImage(MultipartFile file, String folder) throws IOException {
    if (file.isEmpty()) {
      throw new IllegalArgumentException("File cannot be empty");
    }

    if (!isImageFile(file.getContentType())) {
      throw new IllegalArgumentException("Only image files are allowed");
    }

    if (file.getSize() > 5 * 1024 * 1024) {
      throw new IllegalArgumentException("File size cannot exceed 5MB");
    }

    try {
      @SuppressWarnings("unchecked")
      Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(),
          (Map<String, Object>) ObjectUtils.asMap(
              "folder", folder,
              "use_filename", true,
              "unique_filename", true,
              "overwrite", true));

      return (String) uploadResult.get("secure_url");
    } catch (IOException e) {
      throw new RuntimeException("Failed to upload image", e);
    }
  }

  public boolean deleteImage(String imageUrl) {
    try {
      String publicId = extractPublicIdFromUrl(imageUrl);
      @SuppressWarnings("unchecked")
      Map<String, Object> result = (Map<String, Object>) cloudinary.uploader().destroy(publicId,
          ObjectUtils.emptyMap());
      System.out.println(result);
      return "ok".equals(result.get("result"));
    } catch (Exception e) {
      return false;
    }
  }

  private boolean isImageFile(String contentType) {
    return contentType != null && contentType.startsWith("image/");
  }

  private String extractPublicIdFromUrl(String url) {
    if (url == null || !url.contains("/upload/")) {
      return null;
    }

    String[] parts = url.split("/upload/");
    if (parts.length < 2) {
      return null;
    }

    String path = parts[1].replaceFirst("^v\\d+/", "");
    int lastDot = path.lastIndexOf('.');
    if (lastDot > 0) {
      path = path.substring(0, lastDot);
    }

    return path;
  }
}