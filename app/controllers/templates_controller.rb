class TemplatesController < ApplicationController
  def page
    @path = params[:path]
    render :template => 'partials/' + @path, :layout => nil
  end
end
