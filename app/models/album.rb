class Album < ActiveRecord::Base
  attr_accessible :cover_photo, :name, :user_id, :photo_ids
  has_many :album_photos
  has_many :photos, through: :album_photos, dependent: :destroy
  belongs_to :photo, foreign_key: 'cover_photo'
  belongs_to :user
  before_validation :set_cover_photo
  validates :name, presence: true
  validates :cover_photo, presence: { message: "You need to select at least one photo." }  

  if @cover_photo.nil?
    :set_cover_photo
  end

  private 

  def set_cover_photo
    self.photo = self.photos.first
  end
end
