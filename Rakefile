require 'haml'
require 'dotenv/tasks'
require 'aws-sdk'

task :build do
  Dir['build/*haml'].each do |haml_file|
    html = Haml::Engine.new(File.read('build/lib/layout.haml')).render do
      Haml::Engine.new(File.read(haml_file)).render
    end
    file = "web/#{File.basename(haml_file).sub('haml', 'html')}"
    File.open(file, 'w') do |file|
      file.write(html)
      file.close
    end
  end

  sh "cp build/custom.css web/css/custom.css"
end

task deploy: :dotenv do
  s3  = Aws::S3::Resource.new(region: "ap-southeast-2")

  Dir['web/*html'].each do |html|
    obj = s3.bucket("#{ENV['S3_BUCKET']}").object('ast')
    obj.upload_file(html)
  end
end
