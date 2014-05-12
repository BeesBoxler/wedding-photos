class AlbumPhoto < ActiveRecord::Base
  # attr_accessible :title, :body;
  belongs_to :photo
  belongs_to :album
end
