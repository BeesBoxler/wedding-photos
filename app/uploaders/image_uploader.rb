# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base

  include ::CarrierWave::Backgrounder::Delay

  include CarrierWave::MiniMagick

  # Production

  if Rails.env.production?

    storage :fog

    def store_dir
      "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    end

  end

  # Development

  if Rails.env.development?

    storage :file

    def store_dir
      "#{Rails.root.to_s}/public/uploads"
    end

  end
  
  process :auto_orient

  version :teeny do 
    process resize_to_fill: [150, 150]
  end

  version :small do
    process resize_to_fill: [150, 150]
  end

  version :thumb do
    process resize_to_fill: [250, 250]
  end
  
  version :large do
    process resize_to_fit: [1080, 1080]
  end

  def filename
    "#{secure_token(10)}_#{model.user.name.downcase.split.join}.#{file.extension}" if original_filename
  end

  protected

    def secure_token(length=16)
      var = :"@#{mounted_as}_secure_token"
      model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.hex(length/2))
    end

    def auto_orient
      manipulate! do |image|
        image.tap(&:auto_orient)
      end
    end



end
