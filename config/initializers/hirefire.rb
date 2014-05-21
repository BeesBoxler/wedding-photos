FireFire::Resource.configure do |c|
  c.dyno(:resque) do
    HireFire::Macro::Resque.queue(:carrierwave)
  end
end