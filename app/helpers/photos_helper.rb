module PhotosHelper

  def processed?(image, size)
    if image.image_processing
      image.image.url
    else
      image.image.url(size)
    end
  end
  
end
