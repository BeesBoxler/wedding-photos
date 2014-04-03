class RemoveEmailFromPhotos < ActiveRecord::Migration
  def up
    remove_column :photos, :email
  end

  def down
    add_column :photos, :email, :string
  end
end
