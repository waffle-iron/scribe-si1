class TemplatesController < ApplicationController
  def directive
    @path = params[:path]
    render :template => 'directives/' + @path, :layout => nil
  end
end
