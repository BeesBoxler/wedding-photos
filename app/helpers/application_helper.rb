module ApplicationHelper

  def title(page_title)
    base_title = "Grit and Drew 2014"
    if page_title.empty?
      base_title
    else
      "#{page_title} | #{base_title}"
    end
  end


end
