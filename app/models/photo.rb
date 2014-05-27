class Photo < ActiveRecord::Base
  attr_accessible :image, :title, :description, :original_filename
  belongs_to :user
  has_many :album_photos
  has_many :albums, through: :album_photos
  has_many :albums, foreign_key: 'cover_photo'

  mount_uploader :image, ImageUploader, mount_on: :image_file_name
  process_in_background :image

  # before_save :get_original_date

  def original_filename=(filename)
    self.title = filename
  end

  # has_attached_file :image, url: "/assets/:user_id/:photo_id_:user_id_:style.:extension", styles: {
  #   small: '400x400>',
  #   full:'100%'
  # }

  # validates :title, { presence: true }

  # validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  # validates_attachment_presence

  # def get_original_date
  #   exif = EXIFR::JPEG.new(photo).date_time
  #   self.date_taken = exif
  # end

end


