CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                        # required
    :aws_access_key_id      => 'AKIAIY7LLBFZIVJXVVKQ',                        # required
    :aws_secret_access_key  => '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',                        # required
    :region                 => 'eu-west-1',                  # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = 'grit-wedding'                     # required
end