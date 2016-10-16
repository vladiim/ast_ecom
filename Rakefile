require 'haml'
require 'dotenv/tasks'
require 'aws-sdk'

PRODUCTS = [{title: 'Purastat 5™', qty: 3, price: 123.00, img: 'aspect_purastat5_productv2.jpg'}, {title: 'Extreme C 20 30ml', qty: 10, price: 239.00, img: 'extrememe_20.png'}, {title: 'Jungle Brew 30ml', qty: 5, price: 87.99, img: 'jungle_brew.png'}, {title: 'Benefit Clean', qty: 8, price: 47.00, img: 'benefit_clean.png'}, {title: 'TNS Recovery Complex®', qty: 1, price: 189.00, img: 'tns_recovery_complex.png'},{title: 'Teamine®', qty: 1, price: 119.00, img: 'teamine.png'}, {title: 'Scent Secure Gold 236ml', qty: 1, price: 89.00, img: 'scent_secure.png'}, {title: 'Setting Mist - Sunforgettable', qty: 1, price: 56.00, img: 'setting_mist.png'}]

task :build do
  Dir['build/*haml'].each do |haml_file|
    html = Haml::Engine.new(File.read('build/lib/layout.haml')).render do
      Haml::Engine.new(File.read(haml_file)).render(Object.new, products: PRODUCTS)
    end
    file = "web/#{File.basename(haml_file).sub('haml', 'html')}"
    File.open(file, 'w') do |file|
      file.write(html)
      file.close
    end
  end

  sh "cp build/custom.css web/css/custom.css"
  sh "cp build/custom.js web/js/custom.js"
end

task deploy: :dotenv do
  s3  = Aws::S3::Resource.new(region: "ap-southeast-2")

  Dir['web/*html'].each do |html|
    obj = s3.bucket("#{ENV['S3_BUCKET']}").object('ast')
    obj.upload_file(html)
  end
end
