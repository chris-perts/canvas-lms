Rails.logger.info("~~~~~~ initializing firebase")
app = Firebase::Admin::App.new

Rails.logger.info("~~~~~~ got app: #{app}")

