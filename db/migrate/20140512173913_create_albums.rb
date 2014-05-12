class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :name
      t.integer :cover_photo

      t.timestamps
    end
  end
end
