class ImageProcessor
  @queue = :photo_processor_queue

  def self.perform(attributes)
    user = User.new(attributes)
    user.save_and_process_avatar(:now => true)
  end
end