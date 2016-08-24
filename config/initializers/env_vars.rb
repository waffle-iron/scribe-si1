env_file = "#{::Rails.root}/config/env_vars.yml"
if File.exists?(env_file)
  YAML.load_file(env_file)[::Rails.env].each do |key, value|
    ENV[key.to_s] = value
  end
end
