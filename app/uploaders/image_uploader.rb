# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base

  include ::CarrierWave::Backgrounder::Delay

  # include Carrierwave::Compatibility::Paperclip

  # Include RMagick or MiniMagick support:
  include CarrierWave::MiniMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  # storage :file
  storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process :scale => [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  process :auto_orient

  process :get_original_date

  # Create different versions of your uploaded files:
  version :thumb do
    process resize_to_fill: [250, 250]
  end
  
  version :large do
    process resize_to_fit: [1080, 1080]
  end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  # def extension_white_list
  #   %w(jpg jpeg gif png)
  # end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
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

    def get_original_date
      exif = EXIFR::JPEG.new(photo.queued_for_write[:original]).date_time
      self.date_taken = exif
    end

end
