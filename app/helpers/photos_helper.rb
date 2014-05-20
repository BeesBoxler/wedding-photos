module PhotosHelper

  def processed?(image)
    if image.image_processing
      image.image.url
    else
      image.image.url(:thumb)
    end
  end
  
end
