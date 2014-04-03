class Photo < ActiveRecord::Base
  attr_accessible :image
  belongs_to :user

  has_attached_file :image, url: "/assets/:user_id/:time_:photo_id_:user_id_:style.:extension", styles: {
    small: '400x400>',
    full:'100%'
  }



  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

end
