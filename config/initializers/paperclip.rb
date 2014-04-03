Paperclip::Attachment.default_options[:s3_host_name] = 's3-eu-west-1.amazonaws.com'

Paperclip.interpolates('user_id') do |attachment, style|
  attachment.instance.user_id
end

Paperclip.interpolates('photo_id') do |attachment, style|
  attachment.instance.id
end

Paperclip.interpolates('time') do |attachment, style|
  Time.now.to_i.to_s
end