class Photo < ActiveRecord::Base
  # attr_accessible :title, :body

  belongs_to :user

  has_attached_file :image, styles: {
    small: '400x400>',
    full:'100%'
  }

  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

end
