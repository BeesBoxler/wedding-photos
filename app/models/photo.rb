class Photo < ActiveRecord::Base
  attr_accessible :image, :title, :description
  belongs_to :user

  has_attached_file :image, url: "/assets/:user_id/:photo_id_:user_id_:style.:extension", styles: {
    small: '400x400>',
    full:'100%'
  }



  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  #validates_attachment_presence

end
