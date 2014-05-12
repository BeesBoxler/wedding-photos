class CreateAlbumPhotos < ActiveRecord::Migration
  def change
    create_table :album_photos do |t|
      t.belongs_to :album
      t.belongs_to :photo
      t.timestamps
    end
  end
end
